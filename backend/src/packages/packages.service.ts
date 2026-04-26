// External imports
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Internal imports
import { CreatePackageDto } from './dto/create-package.dto';
import { Package } from './entities/package.entity';
import { UpdatePackageDto } from './dto/update-package.dto';
import { UsersService } from '../users/users.service';
import { WarehousesService } from '../warehouses/warehouses.service';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Package)
    private readonly packagesRepository: Repository<Package>,
    private readonly usersService: UsersService,
    private readonly warehousesService: WarehousesService,
  ) {}

  async create(createPackageDto: CreatePackageDto): Promise<Package> {
    const { userId, warehouseId, ...packageData } = createPackageDto;

    const user = await this.usersService.findById(userId);
    const warehouse = await this.warehousesService.findById(warehouseId);

    const pkg = this.packagesRepository.create({
      ...packageData,
      user,
      warehouse,
    });

    return await this.packagesRepository.save(pkg);
  }

  async findAll(): Promise<Package[]> {
    return await this.packagesRepository.find();
  }

  async findById(id: string): Promise<Package> {
    const pkg = await this.packagesRepository.findOneBy({ id });

    if (!pkg) {
      throw new NotFoundException(`Package ${id} not found`);
    }

    return pkg;
  }

  async update(
    id: string,
    updatePackageDto: UpdatePackageDto,
  ): Promise<Package> {
    const { userId, warehouseId, ...packageData } = updatePackageDto;

    const pkg = await this.packagesRepository.preload({
      id,
      ...packageData,
    });

    if (!pkg) {
      throw new NotFoundException(`Package ${id} not found`);
    }

    if (userId) {
      pkg.user = await this.usersService.findById(userId);
    }

    if (warehouseId) {
      pkg.warehouse = await this.warehousesService.findById(warehouseId);
    }

    return await this.packagesRepository.save(pkg);
  }

  async remove(id: string): Promise<void> {
    await this.findById(id);
    await this.packagesRepository.delete(id);
  }
}
