import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ default: 'name1@mail.ru' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: '123456' })
  @MinLength(6, { message: 'Password must be more then 6 symbols' })
  password: string;
}
