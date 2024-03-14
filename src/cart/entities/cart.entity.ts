/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiHideProperty } from '@nestjs/swagger';
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

    // @Column()
    // totalPrice: number;

    @Column()
    productid: number;

    @Column()
    userid: number;
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @OneToOne(() => UserEntity, (user => user.cart))
    @JoinColumn({name: 'userid'})
    users: UserEntity;

    @ApiHideProperty()
    @OneToMany(() => ProductEntity, (product) => product.cart)
    products: ProductEntity[];
  }