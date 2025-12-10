import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Inquiry } from './entities/inquiry.entity';
import { InquiryIndicator } from './entities/inquiry-indicator.entity';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { UpdateInquiryDto } from './dto/update-inquiry.dto';
import { Patient } from 'src/domain/patient/entities/patient.entity';
import { Indicator } from 'src/domain/indicators/entities/indicator.entity';
import { User } from 'src/domain/user/entities/user.entity';

@Injectable()
export class InquiriesService {
  constructor(
    @InjectRepository(Inquiry)
    private readonly inquiryRepo: Repository<Inquiry>,
    @InjectRepository(InquiryIndicator)
    private readonly inquiryIndicatorRepo: Repository<InquiryIndicator>,
    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,
    @InjectRepository(Indicator)
    private readonly indicatorRepo: Repository<Indicator>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateInquiryDto) {
    const patient = await this.patientRepo.findOneBy({ id: dto.patientId });
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    const user = dto.userId
      ? await this.userRepo.findOneBy({ id: dto.userId })
      : null;

    const indicatorIds = dto.indicators.map((item) => item.indicatorId);
    const indicators = await this.indicatorRepo.findBy({
      id: In(indicatorIds),
    });

    if (indicators.length !== indicatorIds.length) {
      throw new NotFoundException('One or more indicators were not found');
    }

    const indicatorMap = new Map(
      indicators.map((indicator) => [indicator.id, indicator]),
    );

    return this.inquiryRepo.manager.transaction(async (manager) => {
      const inquiryRepo = manager.getRepository(Inquiry);
      const inquiryIndicatorRepo = manager.getRepository(InquiryIndicator);

      const inquiry = inquiryRepo.create({
        type_diagnosis: dto.type_diagnosis,
        diagnosis: dto.diagnosis,
        patient_state: dto.patient_state,
        feedback: dto.feedback,
        risk_level: dto.risk_level,
        ai_prompt: dto.ai_prompt,
        ai_response: dto.ai_response,
        ai_confidence: dto.ai_confidence,
        patient,
        ...(user ? { user } : {}),
      });

      inquiry.inquiryIndicators = dto.indicators.map((item) =>
        inquiryIndicatorRepo.create({
          indicator: indicatorMap.get(item.indicatorId),
          value: item.value,
        }),
      );

      return inquiryRepo.save(inquiry);
    });
  }

  async findAll(filters?: {
    patientId?: string;
    patient_state?: string;
    type_diagnosis?: string;
  }) {
    const where: any = {};
    if (filters?.patientId) {
      where.patient = { id: filters.patientId };
    }
    if (filters?.patient_state) {
      where.patient_state = filters.patient_state;
    }
    if (filters?.type_diagnosis) {
      where.type_diagnosis = filters.type_diagnosis;
    }

    return this.inquiryRepo.find({
      where,
      relations: {
        patient: true,
        user: true,
        inquiryIndicators: true,
      },
      order: { createdAt: 'DESC' },
    });
  }

  async findByPatient(patientId: string) {
    return this.findAll({ patientId });
  }

  async findOne(id: string) {
    const inquiry = await this.inquiryRepo.findOne({
      where: { id },
      relations: {
        patient: true,
        user: true,
        inquiryIndicators: true,
      },
    });

    if (!inquiry) {
      throw new NotFoundException('Inquiry not found');
    }

    return inquiry;
  }

  async update(id: string, dto: UpdateInquiryDto) {
    const existing = await this.inquiryRepo.findOne({
      where: { id },
      relations: { inquiryIndicators: true, patient: true, user: true },
    });

    if (!existing) {
      throw new NotFoundException('Inquiry not found');
    }

    return this.inquiryRepo.manager.transaction(async (manager) => {
      if (dto.patientId) {
        const patient = await manager
          .getRepository(Patient)
          .findOneBy({ id: dto.patientId });
        if (!patient) {
          throw new NotFoundException('Patient not found');
        }
        existing.patient = patient;
      }

      if (dto.userId) {
        const user = await manager
          .getRepository(User)
          .findOneBy({ id: dto.userId });
        if (!user) {
          throw new NotFoundException('User not found');
        }
        existing.user = user;
      }

      if (dto.type_diagnosis) existing.type_diagnosis = dto.type_diagnosis;
      if (dto.diagnosis) existing.diagnosis = dto.diagnosis;
      if (dto.patient_state) existing.patient_state = dto.patient_state;
      if (dto.feedback) existing.feedback = dto.feedback;
      if (dto.risk_level) existing.risk_level = dto.risk_level;
      if (dto.ai_prompt) existing.ai_prompt = dto.ai_prompt;
      if (dto.ai_response) existing.ai_response = dto.ai_response;
      if (dto.ai_confidence !== undefined)
        existing.ai_confidence = dto.ai_confidence;

      if (dto.indicators) {
        await manager
          .getRepository(InquiryIndicator)
          .createQueryBuilder()
          .delete()
          .where('inquiryId = :id', { id })
          .execute();

        const indicators = await manager.getRepository(Indicator).findBy({
          id: In(dto.indicators.map((item) => item.indicatorId)),
        });

        if (indicators.length !== dto.indicators.length) {
          throw new NotFoundException('One or more indicators were not found');
        }

        const indicatorMap = new Map(
          indicators.map((indicator) => [indicator.id, indicator]),
        );

        existing.inquiryIndicators = dto.indicators.map((item) =>
          manager.getRepository(InquiryIndicator).create({
            indicator: indicatorMap.get(item.indicatorId),
            value: item.value,
          }),
        );
      }

      return manager.getRepository(Inquiry).save(existing);
    });
  }

  async remove(id: string) {
    const inquiry = await this.findOne(id);
    return this.inquiryRepo.softRemove(inquiry);
  }

  // Esquematización para la futura integración con IA (OpenAI / DeepSeek).
  // Recibirá indicadores y devolverá prompt y respuesta para guardar en la consulta.
  async buildAiSecondOpinionPayload(indicators: {
    indicatorId: string;
    value: number;
  }[]) {
    return {
      prompt: 'TODO: construir prompt con los indicadores',
      response: 'TODO: respuesta del modelo IA',
      confidence: null,
      indicators,
    };
  }
}
