import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from 'configuration/configuration.module';
import { UserModule } from './modules/user/user.module';
import { VideoModule } from './modules/video/video.module';

@Module({
  imports: [UserModule, VideoModule, ConfigurationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
