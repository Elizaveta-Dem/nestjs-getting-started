/* eslint-disable prettier/prettier */
import { ProductEntity } from 'src/product/entities/product.entity';
// import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  // OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('orderItem')
export class OrderItemEntity {
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

  // @OneToOne(() => UserEntity, (user) => user.orderItem)
  // @JoinColumn({ name: 'userid' })
  // users: UserEntity;

  @OneToMany(() => ProductEntity, (product) => product.orderItem)
  @JoinColumn()
  products: ProductEntity[];
}
