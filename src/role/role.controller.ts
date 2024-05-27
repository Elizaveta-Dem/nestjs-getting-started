import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    try {
      const role = await this.roleService.createRole(createRoleDto);
      return { role };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  async getRoleById(@Param('id') id: number) {
    const role = await this.roleService.getRoleById(id);
    return { role };
  }

  @Get('by-value/:value')
  async getRoleByValue(@Param('value') value: string) {
    const role = await this.roleService.getRoleByValue(value);
    return { role };
  }
}
