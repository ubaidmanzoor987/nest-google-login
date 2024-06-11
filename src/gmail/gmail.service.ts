import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { google } from 'googleapis';

@Injectable()
export class GmailService {
  constructor(private readonly authService: AuthService) {}

  async getEmails(startDate: string, endDate: string) {
    const oauth2Client = await this.authService.getOAuth2Client();
    const tokens = oauth2Client.credentials;

    // Check if access token is available
    if (!tokens.access_token) {
      throw new UnauthorizedException('No access token available');
    }

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    const res = await gmail.users.messages.list({
      userId: 'me',
      q: `after:${new Date(startDate).getTime() / 1000} before:${new Date(endDate).getTime() / 1000}`,
    });
    return res.data.messages;
  }
}
