/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiHideProperty } from '@nestjs/swagger';
import { ProductEntity } from 'src/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('cart')
export class CartEntity {
    [x: string]: any;
    @PrimaryGeneratedColumn()
    id: number;
  
    // @Column()
    // name: string;

    @Column('int', {array: true})
    quantity: number[];
  
    // @Column('int', {array: true})
    // prices: number[];

    @Column()
    productid: number;
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
  
    @ApiHideProperty()
    @OneToMany(() => ProductEntity, (product) => product.cart)
    products: ProductEntity[];
  }