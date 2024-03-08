import { Module } from '@nestjs/common';
import { LikeVideoService } from './like-video.service';
import { LikeVideoController } from './like-video.controller';
import { LikeComment } from '../like-comment/entities/like-comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([LikeComment])],
  controllers: [LikeVideoController],
  providers: [LikeVideoService],
})
export class LikeVideoModule {}
