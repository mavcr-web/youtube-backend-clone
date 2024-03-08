import { Test, TestingModule } from '@nestjs/testing';
import { LikeCommentController } from './like-comment.controller';
import { LikeCommentService } from './like-comment.service';

describe('LikeCommentController', () => {
  let controller: LikeCommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikeCommentController],
      providers: [LikeCommentService],
    }).compile();

    controller = module.get<LikeCommentController>(LikeCommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
