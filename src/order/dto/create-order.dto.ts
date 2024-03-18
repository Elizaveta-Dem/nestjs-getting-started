/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ApiProperty } from '@nestjs/swagger';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IsNumber, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsNumber()
  productid: number;

  @ApiProperty()
  @IsPositive()
  @IsNumber()
  quantity: number;
  prices: number;
  dataAdress: string;
  payment: number;
  apartment: number;
  phone: string;
  house: number;
  street: string;
  surname: string;
  name: string;
}