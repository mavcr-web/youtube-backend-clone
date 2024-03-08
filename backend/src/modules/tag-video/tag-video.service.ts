import { Injectable } from '@nestjs/common';
import { CreateTagVideoDto } from './dto/create-tag-video.dto';
import { UpdateTagVideoDto } from './dto/update-tag-video.dto';
import { TagVideo } from './entities/tag-video.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

@Injectable()
export class TagVideoService {
  constructor(
    @InjectRepository(TagVideo)
    private readonly tagVideoRepository: Repository<TagVideo>,
  ) {}
  async create(createTagVideoDto: CreateTagVideoDto) {
    const db = await this.tagVideoRepository.save(createTagVideoDto);
    return db;
  }

  async findAll(name: string) {
    try {
      const where: any = {};
      name && name !== ''
        ? (where.title = Like(`%${name.toLowerCase()}%`))
        : null;

      return await this.tagVideoRepository.find({
        take: 100,
        where: where,
      });
    } catch (error) {
      console.log('error', error);
      return { error: error.message };
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} tagVideo`;
  // }

  // update(id: number, updateTagVideoDto: UpdateTagVideoDto) {
  //   return `This action updates a #${id} tagVideo`;
  // }

  async remove(id: number) {
    try {
      const db = await this.tagVideoRepository.delete({ id: id });
      if (db.affected === 0) {
        return { message: 'Not found' };
      }
      return db;
    } catch (error) {
      return error;
    }
  }
}
