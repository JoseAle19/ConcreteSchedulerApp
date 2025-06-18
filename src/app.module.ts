import { UsersModule } from './users/users.module';
import { ReservationsModule } from './reservations/reservations.module';
import { CalendarModule } from './calendar/calendar.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationEntity } from './reservations/infrastructure/reservation.entity';
import { SlotEntity } from './calendar/infrastructure/slot.entity';

@Module({
  imports: [
    UsersModule,
    ReservationsModule,
    CalendarModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [ReservationEntity, SlotEntity],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
