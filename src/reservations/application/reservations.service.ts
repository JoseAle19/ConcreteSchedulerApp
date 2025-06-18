/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ReservationsRepository } from '../infrastructure/reservations.repository';
import { ReservationResponseDto } from '../dto/reservation-response.dto';
import { v4 as uuidV4 } from 'uuid';
import { CreateReservationDto } from '../dto/createreservation.dto';
import { CalendarRepository } from 'src/calendar/infrastructure/calendar.repository';
@Injectable()
export class ReservationsService {

     constructor(
      private readonly repo: ReservationsRepository,
      private readonly calendar: CalendarRepository
      ) { }

  create(dto: CreateReservationDto): ReservationResponseDto {

    const slots = this.calendar.getSlots(dto.date);
    const slot = slots.find(s => s.time == dto.slot);
    if(!slot || !slot.available){
      throw new BadRequestException('Slot no disponible');
    }
    this.calendar.blockSlot(dto.date, dto.slot);


    const reservation = {id:uuidV4(), ...dto};
    this.repo.add(reservation);
    return reservation;
  }

  findOne(id: string): ReservationResponseDto {
    const res = this.repo.get(id);
    if (!res) throw new NotFoundException('Reservacion no encontrada');
    return res;
  }
  findByIds(ids: string[]): ReservationResponseDto[] {
    const res = this.repo.getByIds(ids);
    if (!res) throw new NotFoundException('Reservacion no encontrada');
    return res;
  }


  findByUser(email: string): ReservationResponseDto[] {
    return this.repo.listByEmail(email);
  }
 }
