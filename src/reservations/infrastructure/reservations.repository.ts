import { Injectable } from '@nestjs/common';
import { ReservationResponseDto } from '../dto/reservation-response.dto';
import { ReservationEntity } from './reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

// const STORAGE: Record<string, ReservationResponseDto> = {};
@Injectable()
export class ReservationsRepository {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly repo: Repository<ReservationEntity>,
  ) {}


  // add(res: ReservationResponseDto) {
  //   STORAGE[res.id] = res;
  // }

  
  async add(res: ReservationEntity) {
    return this.repo.save(res);
  }

  // get(id: string) {
  //   return STORAGE[id];
  // }

  async get(id: string) {
    return this.repo.findOneBy({ id });
  }

  // listByEmail(email: string) {
  //   return Object.values(STORAGE).filter((r) => r.email === email);
  // }



  async listByEmail(email: string) {
    return this.repo.findBy({ email });
  }



  
    async getByIds(ids: string[]) {
    return this.repo.findBy({ id: In(ids) });
  }

  // getByIds(ids: string[]): ReservationResponseDto[] {
  //   return ids
  //     .map((id) => STORAGE[id])
  //     .filter((reservation) => reservation !== undefined);
  // }
}
