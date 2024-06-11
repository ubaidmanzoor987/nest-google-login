import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { GmailModule } from './gmail/gmail.module';
import { CalendarModule } from './calendar/calendar.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    GmailModule,
    CalendarModule,
    ContactsModule,
  ],
})
export class AppModule {}
