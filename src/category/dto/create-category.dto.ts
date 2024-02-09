import { IsNotEmpty, IsString } from 'class-validator'; // библиотека класс валидатор

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
