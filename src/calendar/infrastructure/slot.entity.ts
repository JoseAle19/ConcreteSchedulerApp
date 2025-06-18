import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('calendar_slots')
export class SlotEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  date: string;  

  @Column()
  time: string;  

  @Column({ default: true })
  available: boolean;
}
