import { Injectable } from '@nestjs/common';
import { CalendarRepository } from '../infrastructure/calendar.repository';
import { DayAvailability, Slot } from '../interfaces/calendar.interfaces';


@Injectable()
export class CalendarService {
  constructor(private readonly repo: CalendarRepository) { }

async  getMonthAvailability(month: string, year: string): Promise<DayAvailability[]> {
    return this.repo.getMonth(month, year);
  }

 async getDaySlots(date: string): Promise<Slot[]> {
    return this.repo.getSlots(date);
  }
}
