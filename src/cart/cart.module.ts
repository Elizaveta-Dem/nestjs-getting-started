/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([CartEntity]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
