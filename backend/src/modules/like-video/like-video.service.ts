import { Injectable } from '@nestjs/common';
import { CreateLikeVideoDto } from './dto/create-like-video.dto';
import { UpdateLikeVideoDto } from './dto/update-like-video.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikeVideo } from './entities/like-video.entity';

@Injectable()
export class LikeVideoService {
  constructor(
    @InjectRepository(LikeVideo)
    private readonly likeVideoRepository: Repository<LikeVideo>,
  ) {}
  async create(createLikeVideoDto: CreateLikeVideoDto, idUser: number) {
    createLikeVideoDto.idUser = idUser;
    const db = await this.likeVideoRepository.save(createLikeVideoDto);
    return db;
  }

  findAll(idVideo: number) {
    return this.likeVideoRepository.findAndCount({
      where: { idVideo: idVideo },
    })
  }

  async findOne(idVideo: number, idUser: number) {
    const db = await this.likeVideoRepository.findOne({
      where: { idVideo: idVideo, idUser: idUser },
    });

    if (db) {
      return true;
    } else {
      return false;
    }
  }

  // update(id: number, updateLikeVideoDto: UpdateLikeVideoDto) {
  //   return `This action updates a #${id} likeVideo`;
  // }

  remove(id: number, idUser: number) {
    return this.likeVideoRepository.delete({ idVideo: id, idUser: idUser });
  }
}
