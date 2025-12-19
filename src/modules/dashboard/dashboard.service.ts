import { Injectable } from '@nestjs/common';
import { PatientService } from 'src/domain/patient/patient.service';
import { InquiriesService } from '../inquiries/inquiries.service';
import { Patient } from 'src/domain/patient/entities/patient.entity';
import { PatientWithLastStateDto } from 'src/domain/patient/dto/patient-with-last-state.dto';

@Injectable()
export class DashboardService {
  constructor(
    private readonly patientService: PatientService,
    private readonly inquiriesService: InquiriesService,
  ) {}

  async getRecentPatients() {
    const recentInquiries = await this.inquiriesService.findAll(); // Obtener los inquiries recientes ordenados por fecha
    const fiveRecentInquiries = recentInquiries.slice(0, 5);
    let patientsData: PatientWithLastStateDto[] = [];

    for (const inquiry of fiveRecentInquiries) {
      const patientState = inquiry.patient_state;
      const patient = await this.patientService.findOne(inquiry.patient.id);
      if (
        patientsData &&
        patientsData.find((dto) => dto.patient.id === patient.id)
      ) {
        continue;
      }
      patientsData.push({ patient, lastState: patientState });
    }

    return patientsData;
  }

  async patientsResumeStats() {
    return this.patientService.getCountByMonth();
  }
  
  async inquiryResumeStats() {
    return this.inquiriesService.getCountByMonth();
  }

  async inquiryMonthlyChart(year: number) {
    return this.inquiriesService.getMonthlyInquiryResume(year);
  }

  async AiMonthlyChart(year: number) {
    return this.inquiriesService.getMonthlyAIResume(year);
  }
}
