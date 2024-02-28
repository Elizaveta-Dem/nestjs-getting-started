/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ApiProperty } from '@nestjs/swagger';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IsNumber, IsArray, IsPositive } from 'class-validator';

export class CreateCartDto {
  //   @ApiProperty({
  //     type: 'file',
  //     properties: {
  //       file: {
  //         type: 'string',
  //         format: 'binary',
  //       },
  //     },
  //   })
  //   image: Express.Multer.File;

  @ApiProperty()
  @IsNumber()
  productid: number;

  @ApiProperty()
  @IsPositive()
  @IsNumber()
  quantity: number;
  prices: any;

  //   @ApiProperty()
  //   @IsString()
  //   name: string = 'Название товара';

  //   @ApiProperty()
  //   @IsNumber()
  //   prices: number = 150;
}
