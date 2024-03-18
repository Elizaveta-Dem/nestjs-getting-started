/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { OrderItemEntity } from './orderitem.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  street: string;

  @Column()
  house: number;

  @Column()
  apartment: number;

  @Column()
  phone: string;

  @Column()
  dateAdress: string;

  @Column()
  payment: number;

  @OneToMany(() => OrderItemEntity, (item) => item.id)
  @JoinColumn()
  items: OrderItemEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
