import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}
  async create(createTagDto: CreateTagDto) {
    try {
      const db = await this.tagRepository.findOne({
        where: { name: createTagDto.name },
      });

      if (!db) {
        const newDb = await this.tagRepository.save(createTagDto);
        return newDb;
      }
      return db;
    } catch (error) {
      return { error: error.message };
    }
  }

  async findAll(name: string) {
    try {
      const where: any = {};
      name && name !== ''
        ? (where.name = Like(`%${name.toLowerCase()}%`))
        : null;

      return await this.tagRepository.find({
        take: 100,
        where: where,
      });
    } catch (error) {
      console.log('error', error);
      return { error: error.message };
    }
  }

  async findAllById(ids: number[]) {
    try {
      const where: any = {};

      where.id = In(ids);

      return await this.tagRepository.find({
        take: 100,
        where: where,
      });
    } catch (error) {
      console.log('error', error);
      return { error: error.message };
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} tag`;
  // }

  // update(id: number, updateTagDto: UpdateTagDto) {
  //   return `This action updates a #${id} tag`;
  // }

  async remove(id: number) {
    try {
      const db = await this.tagRepository.delete({ id: id });
      if (db.affected === 0) {
        return { message: 'Not found' };
      }
      return db;
    } catch (error) {
      return error;
    }
  }
}
