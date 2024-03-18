/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartEntity } from './entities/cart.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('cart')
@ApiBearerAuth()
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // @Post()
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // create(@Body() dto: CreateCartDto): Promise<CartEntity> {
  //   return this.cartService.create(dto);
  // }

  @Post('/add')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  add(@Body() dto: CreateCartDto): Promise<CartEntity> {
    return this.cartService.add(dto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll(@Param(':id') userid: number) {
    return this.cartService.findAll(userid);
  }

  // @Get(':id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // findOne(@Param('id') id: string): Promise<CartEntity> {
  //   return this.cartService.findOne(+id);
  // }

  // @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // update(@Param('id') id: string, @Body() dto: UpdateCartDto) {
  //   return this.cartService.update(+id, dto);
  // }

  @Patch('/quantity/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  updateQuantity(
    @Body() {quantity}: { quantity: number },
    @Param('id') productid: number,) {
    return this.cartService.updateQuantity(quantity, productid);
  }

  @Patch('/total-price/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  updateTotalPrice(
    @Body() {totalPrice}: { totalPrice: number },
    @Param('id') productid: number,) {
    return this.cartService.updateTotalPrice(totalPrice, productid);
  }

  // @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // remove(@Param('id') id: string): Promise<DeleteResult> {
  //   return this.cartService.delete(+id);
  // }

  @Delete('/delete-one/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  removeOne(@Param('id') productid: number) {
    return this.cartService.remove(productid);
  }

}
