/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IsNumber, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsNumber()
  productid: number = 1;

  @ApiProperty()
  @IsPositive()
  @IsNumber()
  quantity: number = 1;

  @ApiHideProperty()
  @IsPositive()
  @IsNumber()
  prices: number = 100;
  
  @ApiProperty()
  @IsPositive()
  @IsNumber()
  dataAdress: string = 'adress';
  
  @ApiHideProperty()
  @IsPositive()
  @IsNumber()
  payment: number;
  
  @ApiProperty()
  @IsPositive()
  @IsNumber()
  apartment: number = 15;
  
  @ApiProperty()
  @IsPositive()
  @IsNumber()
  phone: string = '89991225636';
  
  @ApiProperty()
  @IsPositive()
  @IsNumber()
  house: number = 55;
  
  @ApiProperty()
  @IsPositive()
  @IsNumber()
  street: string = 'street';
  
  @ApiProperty()
  @IsPositive()
  @IsNumber()
  surname: string = 'surname';
  
  @ApiProperty()
  @IsPositive()
  @IsNumber()
  name: string = 'name';
}