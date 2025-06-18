import { UsersController } from './infraestructure/users.controller';
import { UsersService } from './application/users.service';


import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        UsersController,],
    providers: [
        UsersService,],
})
export class UsersModule { }
