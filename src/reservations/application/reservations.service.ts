/*
https://docs.nestjs.com/providers#services
*/

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReservationsRepository } from '../infrastructure/reservations.repository';
import { ReservationResponseDto } from '../dto/reservation-response.dto';
import { v4 as uuidV4 } from 'uuid';
import { CreateReservationDto } from '../dto/createreservation.dto';
import { CalendarRepository } from 'src/calendar/infrastructure/calendar.repository';
@Injectable()
export class ReservationsService {
  constructor(
    private readonly repo: ReservationsRepository,
    private readonly calendar: CalendarRepository,
  ) {}

 async  create(dto: CreateReservationDto): Promise<ReservationResponseDto> {
    const slots = await this.calendar.getSlots(dto.date);

    const slot = slots.find((s) => s.time == dto.slot);
    if (!slot || !slot.available) {
      throw new BadRequestException('Slot no disponible');
    }
    this.calendar.blockSlot(dto.date, dto.slot);

    const reservation = { id: uuidV4(), ...dto };
    this.repo.add(reservation);
    return reservation;
  }


  async findOne(id: string): Promise<ReservationResponseDto> {
    const res = await this.repo.get(id);
    if (!res) throw new NotFoundException('Reservación no encontrada');
    return res;
  }

  async findByIds(ids: string[]): Promise<ReservationResponseDto[]> {
    const res = await this.repo.getByIds(ids);
    if (!res.length)
      throw new NotFoundException('Reservaciones no encontradas');
    return res;
  }

  async findByUser(email: string): Promise<ReservationResponseDto[]> {
    return await this.repo.listByEmail(email);
  }
}
