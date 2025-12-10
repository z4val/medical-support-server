import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('recent-patients')
  async getRecentPatients() {
    return this.dashboardService.getRecentPatients();
  }
  
  @Get('monthly-patient-resume')
  async getMonthlyPatientResume() {
    return this.dashboardService.patientsResumeStats();
  }
  
  @Get('monthly-inquiry-resume')
  async getMonthlyInquiryResume() {
    return this.dashboardService.inquiryResumeStats();
  }
}
