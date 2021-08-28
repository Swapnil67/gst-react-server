import { IsEmail, IsNotEmpty, IsUUID, Min, min, MIN } from 'class-validator';

export class UserLoginInfo {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @Min(8)
  readonly password: string;
}
