import { Module } from '@nestjs/common';
import { UserModule } from './domain/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { setDatabaseConfig } from './infra/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { PatientModule } from './domain/patient/patient.module';
import { IndicatorsModule } from './domain/indicators/indicators.module';
import { InquiriesModule } from './modules/inquiries/inquiries.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: setDatabaseConfig,
    }),
    UserModule,
    AuthModule,
    PatientModule,
    IndicatorsModule,
    InquiriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
