import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateReservationDto {
  @IsString() @IsNotEmpty()
  date: string;

  @IsString() @IsNotEmpty()
  slot: string;

  @IsString() @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString() @IsNotEmpty()
  phone: string;
}