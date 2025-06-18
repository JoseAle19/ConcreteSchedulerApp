/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReservationsService } from '../application/reservations.service';
import { CreateReservationDto } from '../dto/createreservation.dto';


@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) { }

  @Post()
  create(@Body() dto: CreateReservationDto) {
    return this.reservationsService.create(dto);
  }

  @Post('reservations-by-ids')
  findByIds(@Body('ids') ids: string[]) {
    return this.reservationsService.findByIds(ids);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @Get('user/:email')
  findByUser(@Param('email') email: string) {
    return this.reservationsService.findByUser(email);
  }
}
