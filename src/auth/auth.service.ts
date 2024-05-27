/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ForbiddenException,
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserEntity } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException('Пользователя с таким email нет');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException();

    if (user && isPasswordValid) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  // async register(dto: CreateUserDto) {
  //   const isCreateUsers = this.configService.get('CREATE_USERS') === 'true';
  //   if (!isCreateUsers) {
  //     throw new BadRequestException('Запрещено создавать новых пользователей');
  //   }

  //   try {
  //     const userData = await this.usersService.create(dto);

  //     return {
  //       token: this.jwtService.sign({ id: userData.id, role: userData.role }),
  //     };
  //   } catch (err) {
  //     // throw new ForbiddenException('Ошибка при регистрации');
  //     throw new ForbiddenException(err.message);
  //   }
  // }

  async register(dto: CreateUserDto) {
    const userData = await this.usersService.create(dto);

    return {
      token: this.jwtService.sign({ id: userData.id, role: userData.role }),
    };
  }

  async login(user: UserEntity) {
    return {
      token: this.jwtService.sign({ id: user.id, role: user.role }),
    };
  }
}
