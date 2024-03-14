/* eslint-disable prettier/prettier */
import { CartEntity } from 'src/cart/entities/cart.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('users')
  export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    username: string;
  
    @Column()
    password: string;
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
    cart: any;
    
    @OneToOne(() => CartEntity, cart => cart.users) 
    carts: CartEntity[];
  }