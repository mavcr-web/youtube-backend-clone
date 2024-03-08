import { Test, TestingModule } from '@nestjs/testing';
import { TagVideoService } from './tag-video.service';

describe('TagVideoService', () => {
  let service: TagVideoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagVideoService],
    }).compile();

    service = module.get<TagVideoService>(TagVideoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
