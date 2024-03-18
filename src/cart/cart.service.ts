/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,

    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  // async create(dto: CreateCartDto): Promise<CartEntity> {
  //   return this.cartRepository.save(dto);
  // } //1 вариант

  // async create(user: UserEntity): Promise<CartEntity> {
  //   const cart = new CartEntity(); //создание новой корзины
  //   cart.user = user; //присваивание пользователя корзине
  //   await this.cartRepository.save(cart);
  //   return cart;
  // } //2 вариант

  async add(dto: CreateCartDto): Promise<CartEntity> {
    const cart = new CartEntity();
    const user = await this.usersRepository.findOne({
      where: { id: dto.userid },
    });

    if (user) {
      cart.user = user; //присваивание пользователя корзине
      return this.cartRepository.save(cart);
    } else {
      throw new Error('Пользоватль не найден');
    }
  }

  async findAll(userId: number): Promise<CartEntity[]> {
    return this.cartRepository.find();
  }

  // async findOne(id: number): Promise<CartEntity> {
  //   return this.cartRepository.findOneBy({ id });
  // }

  async updateQuantity(
    quantity: number,
    productid: number,
  ): Promise< { quantity: number} > {
    await this.cartRepository.update({ quantity }, { productid });

    const product = await this.cartRepository.findOne({ where: { productid}});
    return { quantity: product.quantity};
  }

  async updateTotalPrice(
    totalPrice: number,
    productid: number,
  ): Promise< { totalPrice: number} > {
    await this.cartRepository.update({ totalPrice }, { productid });

    const product = await this.cartRepository.findOne({ where: { productid}});
    return { totalPrice: product.totalPrice};
  }

  // async update(id: number, dto: UpdateCartDto) {
  //   const toUpdate = await this.cartRepository.findOneBy({ id });
  //   if (!toUpdate) {
  //     throw new BadRequestException(`Запись id=${id} не найдена`);
  //   }
  //   return this.cartRepository.save(toUpdate);
  // }

  // delete(id: number) {
  //   return this.cartRepository.delete(id);
  // }

  async remove(productid: number): Promise<void> {
    const product = await this.cartRepository.findOne({ where: {productid}});
    await product.destroy();
  }
}
