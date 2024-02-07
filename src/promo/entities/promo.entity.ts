export class Promo {}
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('promo')
export class PromoEntity {
  @PrimaryGeneratedColumn() // декоратор который генерирует id
  id: number;

  @Column()
  image: string;

  @Column()
  title: string;

  @Column()
  text: string;
}
