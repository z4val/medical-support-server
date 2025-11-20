import { Module } from '@nestjs/common';
import { UserModule } from './domain/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { setDatabaseConfig } from './infra/database.config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: setDatabaseConfig,
    }),
    UserModule,
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
