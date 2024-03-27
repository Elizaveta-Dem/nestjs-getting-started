/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ApiProperty } from '@nestjs/swagger';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IsNumber, IsPositive } from 'class-validator';

export class CreateCartDto {
  @ApiProperty()
  @IsNumber()
  productid: number;

  @ApiProperty()
  @IsNumber()
  userid: number;

  @ApiProperty()
  @IsPositive()
  @IsNumber()
  quantity: number;
  prices: any;
}
