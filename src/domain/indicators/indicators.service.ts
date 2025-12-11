import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateIndicatorDto } from './dto/create-indicator.dto';
import { UpdateIndicatorDto } from './dto/update-indicator.dto';
import { Indicator } from './entities/indicator.entity';

@Injectable()
export class IndicatorsService {
  constructor(
    @InjectRepository(Indicator)
    private readonly repository: Repository<Indicator>,
  ) {}

  async create(createIndicatorDto: CreateIndicatorDto) {
    const indicator = this.repository.create(createIndicatorDto);
    return this.repository.save(indicator);
  }

  async findAll(q?: string) {
    if (q) {
      return this.repository.find({
        where: [
          { name: ILike(`%${q}%`) },
          { type: ILike(`%${q}%`) },
          { unit: ILike(`%${q}%`) },
        ],
        order: { name: 'ASC' },
      });
    }

    return this.repository.find({ order: { name: 'ASC' } });
  }

  async findOne(id: string) {
    const indicator = await this.repository.findOneBy({ id });
    if (!indicator) {
      throw new NotFoundException('Indicator not found');
    }
    return indicator;
  }

  async update(id: string, updateIndicatorDto: UpdateIndicatorDto) {
    const indicator = await this.findOne(id);
    Object.assign(indicator, updateIndicatorDto);
    return this.repository.save(indicator);
  }

  async remove(id: string) {
    const indicator = await this.findOne(id);
    return this.repository.remove(indicator);
  }
}
