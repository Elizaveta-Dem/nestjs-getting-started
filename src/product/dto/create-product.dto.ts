/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ApiProperty } from '@nestjs/swagger';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IsString, IsNumber, IsNumberString, IsArray } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  image: Express.Multer.File;

  @ApiProperty()
  @IsString()
  name: string = 'Название товара';

  @ApiProperty()
  @IsString()
  description: string = 'Описание';

  @ApiProperty()
  @IsString()
  prices: string;

  @ApiProperty()
  @IsNumberString()
  categoryId: number;
}
