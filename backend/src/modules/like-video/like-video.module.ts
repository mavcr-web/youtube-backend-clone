import { Module } from '@nestjs/common';
import { LikeVideoService } from './like-video.service';
import { LikeVideoController } from './like-video.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeVideo } from './entities/like-video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LikeVideo])],
  controllers: [LikeVideoController],
  providers: [LikeVideoService],
})
export class LikeVideoModule {}
