import { Controller, Get, Param, Query } from '@nestjs/common';
import { CalendarService } from '../application/calendar.service';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get()
  getMonthAvailability(@Query('month') month: string, @Query('year') year: string) {
    return this.calendarService.getMonthAvailability(month, year);
  }
  
  @Get(':date')
  getDaySlots(@Param('date') date: string) {
    return this.calendarService.getDaySlots(date);
  }
}