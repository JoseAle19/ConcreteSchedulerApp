import { Injectable } from '@nestjs/common';
import { CalendarRepository } from '../infrastructure/calendar.repository';
import { DayAvailability, Slot } from '../interfaces/calendar.interfaces';


@Injectable()
export class CalendarService {
  constructor(private readonly repo: CalendarRepository) { }

  getMonthAvailability(month: string, year: string): DayAvailability[] {
    return this.repo.getMonth(month, year);
  }

  getDaySlots(date: string): Slot[] {
    return this.repo.getSlots(date);
  }
}
