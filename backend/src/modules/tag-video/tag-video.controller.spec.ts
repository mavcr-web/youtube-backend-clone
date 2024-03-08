import { Test, TestingModule } from '@nestjs/testing';
import { TagVideoController } from './tag-video.controller';
import { TagVideoService } from './tag-video.service';

describe('TagVideoController', () => {
  let controller: TagVideoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagVideoController],
      providers: [TagVideoService],
    }).compile();

    controller = module.get<TagVideoController>(TagVideoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
