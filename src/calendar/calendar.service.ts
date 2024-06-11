import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { google } from 'googleapis';

@Injectable()
export class CalendarService {
  constructor(private readonly authService: AuthService) {}

  async getEvents(startDate: string, endDate: string) {
    const oauth2Client = await this.authService.getOAuth2Client();
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const res = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date(startDate).toISOString(),
      timeMax: new Date(endDate).toISOString(),
    });
    return res.data.items;
  }
}
