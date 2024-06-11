import {
  Controller,
  Get,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { CheckTokenExpiryGuard } from './auth.guard';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google Login' })
  async googleAuth() {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google Login Redirect' })
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const user = req.user;
    const redirectUrl = `http://localhost:3001/auth/callback?accessToken=${user.jwtToken}`;

    // Redirect to the Next.js application with the JWT token
    console.log({ redirectUrl, user });
    // res.redirect(redirectUrl);
    res.cookie('access_token', user.accessToken, { httpOnly: true });
    res.cookie('refresh_token', user.refreshToken, {
      httpOnly: true,
    });
    return res.json({ user });
  }

  @UseGuards(CheckTokenExpiryGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    const accessToken = req.cookies['access_token'];
    if (accessToken) return await this.authService.getProfile(accessToken);
    throw new UnauthorizedException('No access token');
  }
}
