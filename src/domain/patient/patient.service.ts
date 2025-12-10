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
}
