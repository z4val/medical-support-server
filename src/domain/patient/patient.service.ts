import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly repository: Repository<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const patient = this.repository.create(createPatientDto);
    return this.repository.save(patient);
  }

  async findAll() {
    return this.repository.find();
  }

  async filterBy(criteria: Partial<Patient>) {
    return this.repository.find({ where: criteria });
  }

  async findOne(id: string) {
    const patient = await this.repository.findOne({ where: { id } });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    return patient;
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    const patient = await this.repository.preload({
      id,
      ...updatePatientDto,
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    return this.repository.save(patient);
  }

  async remove(id: string) {
    const patient = await this.findOne(id);
    return this.repository.softRemove(patient);
  }

  async getCountByMonth(): Promise<{
    total: number;
    previous: number;
    changePercent: number;
  }> {
    const now = new Date();

    // inicio del mes actual y del siguiente (limites [startCurrent, startNext) )
    const startCurrent = new Date(now.getFullYear(), now.getMonth(), 1);
    const startNext = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    // inicio del mes anterior
    const startPrevious = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const historicTotal = await this.repository.count();
    
    // Conteo mes actual (excluye soft-deleted explícitamente)
    const totalCurrent = await this.repository
      .createQueryBuilder('patient')
      .where(
        'patient.createdAt >= :startCurrent AND patient.createdAt < :startNext',
        {
          startCurrent: startCurrent.toISOString(),
          startNext: startNext.toISOString(),
        },
      )
      .andWhere('patient.deletedAt IS NULL')
      .getCount();

    // Conteo mes anterior
    const totalPrevious = await this.repository
      .createQueryBuilder('patient')
      .where(
        'patient.createdAt >= :startPrevious AND patient.createdAt < :startCurrent',
        {
          startPrevious: startPrevious.toISOString(),
          startCurrent: startCurrent.toISOString(),
        },
      )
      .andWhere('patient.deletedAt IS NULL')
      .getCount();

    // Calcular cambio porcentual
    let changePercent = 0;
    if (totalPrevious === 0) {
      changePercent = totalCurrent === 0 ? 0 : 100;
    } else {
      changePercent = ((totalCurrent - totalPrevious) / totalPrevious) * 100;
    }

    // opcional: redondear a 2 decimales
    changePercent = Math.round(changePercent * 100) / 100;

    return {
      total: totalCurrent,
      previous: totalPrevious,
      changePercent,
    };
  }
}
