import { Controller, Get, Query } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('calendar')
@ApiBearerAuth()
@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get('events')
  @ApiOperation({ summary: 'Get Calendar Events within a time range' })
  async getEvents(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.calendarService.getEvents(startDate, endDate);
  }
}
