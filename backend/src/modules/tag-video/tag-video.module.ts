import { Module } from '@nestjs/common';
import { TagVideoService } from './tag-video.service';
import { TagVideoController } from './tag-video.controller';
import { TagVideo } from './entities/tag-video.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TagVideo])],
  controllers: [TagVideoController],
  providers: [TagVideoService],
})
export class TagVideoModule {}
