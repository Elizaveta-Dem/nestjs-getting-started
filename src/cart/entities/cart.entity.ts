/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { OrderItemEntity } from 'src/order/entities/orderitem.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@Entity('cart')
export class CartEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column('int', {array: true})
    quantity: number;
  
    @Column('int')
    prices: number;

    @Column()
    totalPrice: number;

    @Column()
    productid: number;

    @Column()
    userid: number;
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @OneToOne(() => UserEntity, (user => user.carts))
    @JoinColumn({name: 'userid'})
    users: UserEntity;

    @OneToMany(() => ProductEntity, (product) => product.carts)
    products: ProductEntity[];
  user: UserEntity;
  destroy: any;

    @OneToOne(() => OrderItemEntity, (orderItem) => orderItem.carts)
    @JoinColumn()
    orderItem: OrderItemEntity;
  }