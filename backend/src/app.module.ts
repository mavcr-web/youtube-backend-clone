import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from 'configuration/configuration.module';
import { UserModule } from './modules/user/user.module';
import { VideoModule } from './modules/video/video.module';
import { AuthModule } from './modules/auth/auth.module';
import { HistoryModule } from './modules/history/history.module';
import { LikeVideoModule } from './modules/like-video/like-video.module';

@Module({
  imports: [
    UserModule,
    VideoModule,
    AuthModule,
    ConfigurationModule,
    HistoryModule,
    LikeVideoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
