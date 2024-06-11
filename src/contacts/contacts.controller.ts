import { Controller, Get } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('contacts')
@ApiBearerAuth()
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get('list')
  @ApiOperation({ summary: 'Get Contact List' })
  async getContacts() {
    return this.contactsService.getContacts();
  }
}
