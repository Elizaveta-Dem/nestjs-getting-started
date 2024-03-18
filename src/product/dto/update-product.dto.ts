/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

// eslint-disable-next-line prettier/prettier
export class UpdateProductDto extends PartialType(CreateProductDto) {
  prices: any;
}