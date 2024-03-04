import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.SQL_TYPE == 'postgres' ? 'postgres' : null,
      host: process.env.SQL_HOST,
      username: process.env.SQL_USERNAME,
      password: process.env.SQL_PASSWORD,
      database: process.env.SQL_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(
        __dirname,
        '..',
        '..',
        'public',
      ) /* aqui pondremos la carpeta que queremos hacer publica */,
    }),
  ],
})
export class ConfigurationModule {}
