
import {  Module } from '@nestjs/common';
import { ReservationsController } from './infrastructure/reservations.controller';

import { ReservationsRepository } from './infrastructure/reservations.repository';
import { ReservationsService } from './application/reservations.service';
import { CalendarRepository } from 'src/calendar/infrastructure/calendar.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationEntity } from './infrastructure/reservation.entity';
import { CalendarModule } from 'src/calendar/calendar.module';
 
@Module({
  imports: [
    TypeOrmModule.forFeature([ReservationEntity]), CalendarModule
  ],
  controllers: [
    ReservationsController],
  providers: [
    ReservationsService,ReservationsRepository,CalendarRepository],
})

export class ReservationsModule {
 
}
