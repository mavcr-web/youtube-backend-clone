import { Injectable } from '@nestjs/common';
import { CreateLikeVideoDto } from './dto/create-like-video.dto';
import { UpdateLikeVideoDto } from './dto/update-like-video.dto';
import { LikeComment } from '../like-comment/entities/like-comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LikeVideoService {
  constructor(
    @InjectRepository(LikeComment)
    private readonly likeCommentRepository: Repository<LikeComment>,
  ) {}
  create(createLikeVideoDto: CreateLikeVideoDto) {
    return 'This action adds a new likeVideo';
  }

  findAll() {
    return `This action returns all likeVideo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} likeVideo`;
  }

  update(id: number, updateLikeVideoDto: UpdateLikeVideoDto) {
    return `This action updates a #${id} likeVideo`;
  }

  remove(id: number) {
    return `This action removes a #${id} likeVideo`;
  }
}
