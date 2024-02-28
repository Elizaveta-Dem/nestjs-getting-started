/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// @Injectable()
// export class CartService {
//   findByCategoryId: any;
//   create(createCartDto: CreateCartDto) {
//     return 'This action adds a new cart';
//   }

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
  ) {}

  // eslint-disable-next-line prettier/prettier
  async create(dto: CreateCartDto, image: Express.Multer.File): Promise<CartEntity> {
    return this.cartRepository.save(CreateCartDto);
  }

  // async create(dto: CreateCartDto): Promise<CartEntity> {
  //   const newCart = await this.cartRepository.create(createCartDto);
  //   return await this.cartRepository.save(newCart);
  // }

  // async create(
  //   dto: CreateCartDto,
  //   image: Express.Multer.File,
  // ): Promise<CartEntity> {
  //   const cart = new CartEntity();
  //   cart.image = image.filename;
  //   cart.quantity = dto.quantity;
  //   cart.prices = dto.prices;

  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const newCart = await this.cartRepository.save(cart);
  //   return newCart;
  // }

  async findAll(): Promise<CartEntity[]> {
    return this.cartRepository.find();
  }

  async findOne(id: number): Promise<CartEntity> {
    return this.cartRepository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateCartDto, image: Express.Multer.File) {
    const toUpdate = await this.cartRepository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Запись id=${id} не найдена`);
    }
    return this.cartRepository.save(toUpdate);
  }

  remove(id: number) {
    return this.cartRepository.delete(id);
  }
}
