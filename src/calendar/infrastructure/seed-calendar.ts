import { SlotEntity } from './slot.entity';
import { Like, Repository } from 'typeorm';

export async function seedCalendar(
  repo: Repository<SlotEntity>,
  year: string,
  month: string
): Promise<void> {
  const existing = await repo.count({
    where: { date: Like(`${year}-${month.padStart(2, '0')}-%`) },
  });

  if (existing > 0) return;

  const totalDays = new Date(Number(year), Number(month), 0).getDate();
  const defaultTimes = ['08:00', '10:00', '12:00', '13:30', '13:45'];
  const slots: SlotEntity[] = [];

  for (let i = 1; i <= totalDays; i++) {
    const date = `${year}-${month.padStart(2, '0')}-${String(i).padStart(2, '0')}`;

     const numSlotsToday = Math.floor(Math.random() * defaultTimes.length);  
    const timesToday = shuffleArray(defaultTimes).slice(0, numSlotsToday + 1); 

    for (const time of timesToday) {
       const available = Math.random() > 0.3;
      slots.push({ date, time, available } as SlotEntity);
    }
  }

  await repo.save(slots);
}

 function shuffleArray<T>(array: T[]): T[] {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
