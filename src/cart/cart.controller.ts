import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  // Query,
  UseInterceptors,
  UploadedFile,
  Response,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
// import { ApiQuery } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteResult } from 'typeorm';

import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartEntity } from './entities/cart.entity';
import { fileStorage } from './storage';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: fileStorage }))
  create(
    @Body() dto: CreateCartDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<CartEntity> {
    return this.cartService.create(dto, image);
  }

  @Get('/image/:path')
  download(@Param('path') path: string, @Response() response) {
    return response.sendFile(path, { root: './db_images/cart' });
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  // @Get()
  // @ApiQuery({ name: 'categoryId', required: false })
  // findAll(@Query('categoryId') categoryId: number): Promise<CartEntity[]> {
  //   if (categoryId) return this.cartService.findByCategoryId(categoryId);
  //   else return this.cartService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CartEntity> {
    return this.cartService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
  //   return this.cartService.update(+id, updateCartDto);
  // }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: fileStorage }))
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCartDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<CartEntity> {
    return this.cartService.update(+id, dto, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.cartService.remove(+id);
  }
}
