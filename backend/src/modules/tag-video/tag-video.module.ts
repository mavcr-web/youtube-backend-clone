import { Module } from '@nestjs/common';
import { TagVideoService } from './tag-video.service';
import { TagVideoController } from './tag-video.controller';

@Module({
  controllers: [TagVideoController],
  providers: [TagVideoService],
})
export class TagVideoModule {}
