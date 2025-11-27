import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientService {

  constructor(private readonly repository: Repository<Patient>){}

  async create(createPatientDto: CreatePatientDto) {
    return this.repository.save(createPatientDto);
  }

  async findAll() {
    return this.repository.find();
  }

  async filterBy(criteria: Partial<Patient>) {
    return this.repository.find({ where: criteria});
  }

  async findOne(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    return this.repository.update(id, updatePatientDto);
  }

  async remove(id: string) {
    return this.repository.softDelete(id);
  }
}
