import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const setDatabaseConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DATABASE'),
  // aditional
  autoLoadEntities: configService.get<boolean>('DB_AUTOLOAD'),
  synchronize: configService.get<boolean>('DB_SYNCH'),
  logging: configService.get<boolean>('DB_LOG'),
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
