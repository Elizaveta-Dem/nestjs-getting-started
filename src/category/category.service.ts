import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private repository: Repository<CategoryEntity>,
  ) {}

  async create(dto: CreateCategoryDto) {
    return this.repository.save(dto);
  }

  async findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateCategoryDto) {
    const toUpdate = await this.repository.findOneBy({ id }); // findOneBy чтобы не выдавать пользователю большой код, который выдала база данных
    if (!toUpdate) {
      throw new BadRequestException(`Запись с id=${id} не найдена`);
    }
    if (dto.name) {
      toUpdate.name = dto.name; //существует ли тот столбец в бд который хочет изменить клиент
    }
    return this.repository.save(toUpdate);
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }
}
