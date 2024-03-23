/* eslint-disable prettier/prettier */
// import { ProductEntity } from 'src/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  // OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { CartEntity } from 'src/cart/entities/cart.entity';

@Entity('orderItem')
export class OrderItemEntity {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OrderEntity, (order) => order.items)
  order: OrderEntity[];

  @Column('int', { array: true })
  quantity: number;

  @Column('int')
  prices: number;

  // @Column()
  // totalPrice: number;

  @Column()
  productid: number;

  @Column()
  userid: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @OneToOne(() => UserEntity, (user) => user.orderItem)
  @JoinColumn({ name: 'userid' })
  users: UserEntity;

  @OneToOne(() => CartEntity, (cart) => cart.orderItem)
  @JoinColumn()
  carts: CartEntity;

  // @OneToMany(() => ProductEntity, (product) => product.orderItem)
  // @JoinColumn()
  // products: ProductEntity[];
}
