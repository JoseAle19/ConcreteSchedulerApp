import { ReservationResponseDto } from "../dto/reservation-response.dto";

const STORAGE: Record<string, ReservationResponseDto> = {};

export class ReservationsRepository {
  add(res: ReservationResponseDto) { STORAGE[res.id] = res; }


  get(id: string) { return STORAGE[id]; }
 
  listByEmail(email: string) { return Object.values(STORAGE).filter(r => r.email === email); }

   getByIds(ids: string[]): ReservationResponseDto[] {
    return ids
      .map(id => STORAGE[id])
      .filter(reservation => reservation !== undefined);
  }
}
