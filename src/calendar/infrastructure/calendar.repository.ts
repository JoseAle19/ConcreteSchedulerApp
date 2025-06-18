import { Injectable } from "@nestjs/common";
import { DayAvailability, Slot } from "../interfaces/calendar.interfaces";

const generateMockDays = (month: string, year: string): DayAvailability[] => {
  const days: DayAvailability[] = [];
  const totalDays = new Date(Number(year), Number(month), 0).getDate();
  for (let i = 1; i <= totalDays; i++) {
    const day = `${year}-${month.padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
    days.push({ date: day, available: i % 2 === 0 }); // alternar disponibilidad
  }
  return days;
};

const generateMockSlots = (date: string): Slot[] => [
  { time: '08:00', available: true },
  { time: '10:00', available: date.endsWith('2') ? false : true },
  { time: '12:00', available: true },
  { time: '14:00', available: true },
  { time: '13:30', available: true },
  { time: '13:45', available: true },
  { time: '16:00', available: false },
];

const DAYS: DayAvailability[] = generateMockDays('09', '2025');
const SLOTS: Record<string, Slot[]> = {};
DAYS.forEach(d => SLOTS[d.date] = generateMockSlots(d.date));


@Injectable()
export class CalendarRepository {
  getMonth(month: string, year: string): DayAvailability[] {
    return DAYS.filter(day => {
      const [y, m] = day.date.split('-');
      return y === year && m === month.padStart(2, '0');
    });
  }
  getSlots(date: string): Slot[] {
    return SLOTS[date] || [];
  }
  blockSlot(date:string, time:string):void{
    const slots = SLOTS[date];
    if(!slots) return;
    const slot = slots.find(s => s.time == time);
    if(slot) slot.available = false;
  }
}
