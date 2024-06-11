import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

@Injectable()
export class AuthService {
  private oauth2Client: OAuth2Client;

  constructor(private readonly jwtService: JwtService) {
    this.oauth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI,
    );
  }

  async getOAuth2Client(): Promise<OAuth2Client> {
    return this.oauth2Client;
  }

  async setCredentials(tokens: any) {
    console.log('Setting tokens:', tokens);
    this.oauth2Client.setCredentials(tokens);
  }

  async generateJwt(user: any): Promise<string> {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }

  async validateUser(payload: any): Promise<any> {
    return { id: payload.sub, email: payload.email };
  }

  async getNewAccessToken(): Promise<string> {
    try {
      const { credentials } = await this.oauth2Client.refreshAccessToken();
      this.setCredentials(credentials);
      return credentials.access_token;
    } catch (error) {
      throw new Error('Failed to refresh the access token.');
    }
  }

  async getProfile(token: string) {
    try {
      const oauth2 = google.oauth2('v2').userinfo;
      const profile = await oauth2.get({
        auth: this.oauth2Client,
        oauth_token: token,
      });
      return profile.data;
    } catch (error) {
      console.error('Failed to get profile:', error);
    }
  }

  async isTokenExpired(token: string): Promise<boolean> {
    try {
      const oauth2Client = await this.getOAuth2Client();
      oauth2Client.setCredentials({ access_token: token });

      const response = await oauth2Client.getTokenInfo(token);
      const expiresIn = response.expiry_date - Date.now() / 1000;

      return expiresIn <= 0;
    } catch (error) {
      return true;
    }
  }

  async revokeGoogleToken(token: string) {
    try {
      const oauth2Client = await this.getOAuth2Client();
      oauth2Client.revokeToken(token);
    } catch (error) {
      console.error('Failed to revoke the token:', error);
    }
  }
}
