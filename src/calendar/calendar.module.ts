import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarService } from './application/calendar.service';
import { CalendarController } from './infrastructure/calendar.controller';
import { CalendarRepository } from './infrastructure/calendar.repository';
import { SlotEntity } from './infrastructure/slot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SlotEntity])],
  providers: [CalendarService, CalendarRepository],
  controllers: [CalendarController],
    exports: [CalendarRepository, TypeOrmModule],

})
export class CalendarModule {
 
 
}
