import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { PatientModule } from 'src/domain/patient/patient.module';
import { InquiriesModule } from '../inquiries/inquiries.module';

@Module({
  imports: [PatientModule, InquiriesModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
