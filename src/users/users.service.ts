import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { RoleService } from 'src/role/role.service';
import * as bcrypt from 'bcrypt';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private readonly hashSaltRounds: number;

  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    private readonly roleService: RoleService,
  ) {
    this.hashSaltRounds = parseInt(process.env.HASH_SALT_ROUNDS);
  }

  async create(dto: CreateUserDto) {
    const existingUser = await this.findByEmail(dto.email);

    if (existingUser) {
      throw new BadRequestException(
        `Пользователь c таким email ${dto.email} уже существует`,
      );
    }

    const hashedPassword = await bcrypt.hash(dto.password, this.hashSaltRounds);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user = await this.repository.save({
      email: dto.email,
      password: hashedPassword,
    });

    const role = await this.roleService.getRoleByValue('user');
    user.role = role;

    await this.repository.save(user);

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.repository.findOne({
      relations: {
        role: true,
      },
      where: {
        email: email,
      },
    });

    return user;
  }

  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  async findById(id: number) {
    return this.repository.findOneBy({ id });
  }
}
