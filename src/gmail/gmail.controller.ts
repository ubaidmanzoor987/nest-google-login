import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GmailService } from './gmail.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('gmail')
@ApiBearerAuth()
@Controller('gmail')
export class GmailController {
  constructor(private readonly gmailService: GmailService) {}

  @Get('emails')
  @UseGuards(AuthGuard('jwt')) // Ensure you use the appropriate AuthGuard
  @ApiOperation({ summary: 'Get Gmail Emails within a time range' })
  @ApiQuery({
    name: 'startDate',
    required: true,
    type: String,
    example: '2024-01-01T00:00:00Z',
  })
  @ApiQuery({
    name: 'endDate',
    required: true,
    type: String,
    example: '2024-01-31T23:59:59Z',
  })
  async getEmails(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.gmailService.getEmails(startDate, endDate);
  }
}
