import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CategoryEntity } from 'src/category/entities/category.entity';
import { CartEntity } from 'src/cart/entities/cart.entity';
// import { OrderItemEntity } from 'src/order/entities/orderitem.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  prices: string;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    eager: true,
  })
  @JoinColumn()
  category: CategoryEntity;

  @ManyToOne(() => CartEntity, (cart) => cart.products)
  @JoinColumn()
  carts: CartEntity;

  // @ManyToOne(() => OrderItemEntity, (orderItem) => orderItem.products)
  // @JoinColumn()
  // orderItem: OrderItemEntity;
}
