import {
  BadRequestException,
  Injectable,
  // NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import * as fs from 'fs';

@Injectable()
export class CategoryService {
  // remove: any;
  // categoryRepository: any;
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(
    dto: CreateCategoryDto,
    image: Express.Multer.File,
  ): Promise<CategoryEntity> {
    const category = new CategoryEntity();
    category.image = image.filename;
    category.name = dto.name;

    const newCategory = await this.categoryRepository.save(category);

    return newCategory;
  }

  // async create(dto: CreateCategoryDto) {
  //   return this.repository.save(dto);
  // }

  async findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: number) {
    return this.categoryRepository.findOneBy({ id });
  }

  async update(
    id: number,
    dto: UpdateCategoryDto,
    image: Express.Multer.File,
  ): Promise<CategoryEntity> {
    const toUpdate = await this.categoryRepository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Записи id=${id} не найдено`);
    }
    if (dto.name) toUpdate.name = dto.name;

    if (image) {
      if (toUpdate.image !== image.filename) {
        fs.unlink(`db_images/category/${toUpdate.image}`, (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
      toUpdate.image = image.filename;
    }

    return this.categoryRepository.save(toUpdate);
  }

  // async update(id: number, dto: UpdateCategoryDto) {
  //   const toUpdate = await this.repository.findOneBy({ id }); // findOneBy чтобы не выдавать пользователю большой код, который выдала база данных
  //   if (!toUpdate) {
  //     throw new BadRequestException(`Запись id=${id} не найдена`);
  //   }
  //   if (dto.name) {
  //     toUpdate.name = dto.name; //существует ли тот столбец в бд который хочет изменить клиент
  //   }
  //   return this.repository.save(toUpdate);
  // }

  async delete(id: number) {
    return this.categoryRepository.delete(id);
  }
}
