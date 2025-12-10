import { Module } from '@nestjs/common';
import { InquiriesService } from './inquiries.service';
import { InquiriesController } from './inquiries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inquiry } from './entities/inquiry.entity';
import { InquiryIndicator } from './entities/inquiry-indicator.entity';
import { Patient } from 'src/domain/patient/entities/patient.entity';
import { Indicator } from 'src/domain/indicators/entities/indicator.entity';
import { User } from 'src/domain/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Inquiry,
      InquiryIndicator,
      Patient,
      Indicator,
      User,
    ]),
  ],
  controllers: [InquiriesController],
  providers: [InquiriesService],
  exports: [InquiriesService],
})
export class InquiriesModule {}
