/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderItemEntity } from './entities/orderitem.entity';

@Injectable()
export class OrderService {
  // calculateTotalPrice(): number | PromiseLike<number> {
  //   throw new Error('Method not implemented.');
  // }
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,

    @InjectRepository(OrderItemEntity)
    private orderItemRepository: Repository<OrderItemEntity>,
  ) {}

  async createOrder(
    dto: CreateOrderDto,
  ): Promise<OrderEntity> {
    const order = new OrderEntity();
    order.name = dto.name;
    order.surname = dto.surname;
    order.street = dto.street;
    order.house = dto.house;
    order.apartment = dto.apartment;
    order.phone = dto.phone;
    order.dateAdress = dto.dataAdress;
    order.payment = dto.payment;

    return this.orderRepository.save(order);
  }

  // async findAll(): Promise<OrderEntity[]> {
  //   return this.orderRepository.find();
  // }

  async findOne(id: number): Promise<OrderEntity> {
    return this.orderRepository.findOneBy({ id });
  }

  async updateOrder(id: number, dto: UpdateOrderDto): Promise<OrderEntity> {
    const toUpdate = await this.orderRepository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Запись id=${id} не найдена`);
    }
    return this.orderRepository.save(toUpdate);
  }

  async delete(id: number) {
    return this.orderRepository.delete(id);
  }

  // async calculateTotalPrice(userId: number): Promise<number> {
  //   const cartItems = await this.cartRepository.find();
  //   let totalPrice = 0;
  //   cartItems.forEach((item) => {
  //     totalPrice += item.prices * item.quantity;
  //   });
  //   return totalPrice;
  // }

  // async createOrderItem(
  //   orderId: number,
  //   dto: CreateOrderDto,
  // ): Promise<OrderItemEntity> {
  //   const order = await this.orderRepository.findOne(orderId);
  //   const newOrderItem = this.orderItemRepository.create(dto);
  //   newOrderItem.order = order;

  //   return await this.orderItemRepository.save(newOrderItem);
  // }
}