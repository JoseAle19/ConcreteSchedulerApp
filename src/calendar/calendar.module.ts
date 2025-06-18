
import { Module } from '@nestjs/common';
import { CalendarController } from './infrastructure/calendar.controller';
import { CalendarService } from './application/calendar.service';
import { CalendarRepository } from './infrastructure/calendar.repository';
 

@Module({
    providers: [
        CalendarService, CalendarRepository],
    controllers: [
        CalendarController],
    

})
export class CalendarModule { }