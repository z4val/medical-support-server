import { Controller, Get, Query } from '@nestjs/common';
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

  @Get('monthly-inquiry-chart')
  async getMonthlyInquiryChart(@Query('year') year: number) {
    return this.dashboardService.inquiryMonthlyChart(year);
  }
  
  @Get('monthly-ai-chart')
  async getMonthlyAIChart(@Query('year') year: number) {
    return this.dashboardService.AiMonthlyChart(year);
  }
}
