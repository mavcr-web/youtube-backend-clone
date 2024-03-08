import { Injectable } from '@nestjs/common';
import { CreateLikeCommentDto } from './dto/create-like-comment.dto';
import { UpdateLikeCommentDto } from './dto/update-like-comment.dto';
import { LikeComment } from './entities/like-comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LikeCommentService {
  constructor(
    @InjectRepository(LikeComment)
    private readonly likeCommentRepository: Repository<LikeComment>,
  ) {}
  create(createLikeCommentDto: CreateLikeCommentDto) {
    return 'This action adds a new likeComment';
  }

  findAll() {
    return `This action returns all likeComment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} likeComment`;
  }

  update(id: number, updateLikeCommentDto: UpdateLikeCommentDto) {
    return `This action updates a #${id} likeComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} likeComment`;
  }
}
