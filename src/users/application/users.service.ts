import { Injectable } from '@nestjs/common';

export interface User {
  name: string;
  email: string;
  phone: string;
  orders: [];
}

const USERS: User[] = [];

@Injectable()
export class UsersService {

  findOrCreate(user: User): User {
    let u = USERS.find(u => u.email === user.email);
    if (!u) {
      USERS.push(user);
      u = user;
    }
    return u;
  }
}