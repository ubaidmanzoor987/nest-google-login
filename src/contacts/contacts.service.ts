import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { google } from 'googleapis';

@Injectable()
export class ContactsService {
  constructor(private readonly authService: AuthService) {}

  async getContacts() {
    const oauth2Client = await this.authService.getOAuth2Client();
    const people = google.people({ version: 'v1', auth: oauth2Client });
    const res = await people.people.connections.list({
      resourceName: 'people/me',
      personFields: 'names,emailAddresses',
    });
    return res.data;
  }
}
