import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}
  create(createCommentDto: CreateCommentDto, username: string) {
    const db = this.commentRepository.create({
      ...createCommentDto,
      date: new Date(),
      username: username,
    });
    return this.commentRepository.save(db);
  }

  async findAll(id: number) {
    const db = await this.commentRepository.find({ where: { idVideo: id } });
    return db;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} comment`;
  // }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
