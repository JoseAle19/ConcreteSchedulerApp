
import {  Module } from '@nestjs/common';
import { ReservationsController } from './infrastructure/reservations.controller';

import { ReservationsRepository } from './infrastructure/reservations.repository';
import { ReservationsService } from './application/reservations.service';
import { CalendarRepository } from 'src/calendar/infrastructure/calendar.repository';
 
@Module({
  imports: [],
  controllers: [
    ReservationsController],
  providers: [
    ReservationsService,ReservationsRepository,CalendarRepository],
})

export class ReservationsModule {
 
}
