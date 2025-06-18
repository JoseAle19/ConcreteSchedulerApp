import { UsersModule } from './users/users.module';
import { ReservationsModule } from './reservations/reservations.module';
import { CalendarModule } from './calendar/calendar.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [
    UsersModule,
    ReservationsModule,
    CalendarModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
