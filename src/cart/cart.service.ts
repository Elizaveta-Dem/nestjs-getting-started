/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CartService {
  calculateTotalPrice(): number | PromiseLike<number> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
  ) {}

  async create(dto: CreateCartDto): Promise<CartEntity> {
    return this.cartRepository.save(dto);
  }

  async findAll(): Promise<CartEntity[]> {
    return this.cartRepository.find();
  }

  async findOne(id: number): Promise<CartEntity> {
    return this.cartRepository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateCartDto) {
    const toUpdate = await this.cartRepository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Запись id=${id} не найдена`);
    }
    return this.cartRepository.save(toUpdate);
  }

  remove(id: number) {
    return this.cartRepository.delete(id);
  }

  // async calculateTotalPrice(userId: number): Promise<number> {
  //   const cartItems = await this.cartRepository.find();
  //   let totalPrice = 0;
  //   cartItems.forEach((item) => {
  //     totalPrice += item.prices * item.quantity;
  //   });
  //   return totalPrice;
  // }
}
