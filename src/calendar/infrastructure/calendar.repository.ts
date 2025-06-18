import { Injectable } from '@nestjs/common';
import { DayAvailability, Slot } from '../interfaces/calendar.interfaces';
import { SlotEntity } from './slot.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Like, Repository } from 'typeorm';
import { seedCalendar } from './seed-calendar';

@Injectable()
export class CalendarRepository {
  constructor(
    @InjectRepository(SlotEntity)
    private readonly repo: Repository<SlotEntity>,
    private dataSource: DataSource,
  ) {}

  async getMonth(month: string, year: string): Promise<DayAvailability[]> {
    const repo = this.dataSource.getRepository(SlotEntity);
    await seedCalendar(repo, year, month);

    const monthPrefix = `${year}-${month.padStart(2, '0')}`;

    const slots = await this.repo.find({
      where: { date: Like(`${monthPrefix}-%`) },
    });

    const map = new Map<string, boolean>();

    for (const slot of slots) {
      if (!map.has(slot.date)) {
        map.set(slot.date, false);
      }
      if (slot.available) {
        map.set(slot.date, true);
      }
    }

    const result: DayAvailability[] = Array.from(map.entries()).map(
      ([date, available]) => ({
        date,
        available,
      }),
    );

    result.sort((a, b) => a.date.localeCompare(b.date));

    return result;
  }

  async getSlots(date: string): Promise<SlotEntity[]> {
    return this.repo.find({ where: { date } });
  }

  async blockSlot(date: string, time: string): Promise<void> {
    const slot = await this.repo.findOne({ where: { date, time } });
    if (slot) {
      slot.available = false;
      await this.repo.save(slot);
    }
  }
}
