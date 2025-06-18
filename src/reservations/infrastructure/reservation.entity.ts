import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reservations')
export class ReservationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  date: string;

  @Column()
  slot: string;
  
  @Column()
  phone: string;

  @Column()
  name: string;
}
