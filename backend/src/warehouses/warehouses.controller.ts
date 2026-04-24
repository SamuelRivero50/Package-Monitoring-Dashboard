// External imports
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

// Internal imports
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { Warehouse } from './entities/warehouse.entity';
import { WarehousesService } from './warehouses.service';

@Controller('warehouses')
export class WarehousesController {
  constructor(private readonly warehousesService: WarehousesService) {}

  @Get()
  async findAll(): Promise<Warehouse[]> {
    return await this.warehousesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Warehouse> {
    return await this.warehousesService.findById(id);
  }

  @Post()
  async create(
    @Body() createWarehouseDto: CreateWarehouseDto,
  ): Promise<Warehouse> {
    return await this.warehousesService.create(createWarehouseDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWarehouseDto: UpdateWarehouseDto,
  ): Promise<Warehouse> {
    return await this.warehousesService.update(id, updateWarehouseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.warehousesService.remove(id);
  }
}
