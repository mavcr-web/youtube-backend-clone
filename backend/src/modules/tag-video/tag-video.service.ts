import { Injectable } from '@nestjs/common';
import { CreateTagVideoDto } from './dto/create-tag-video.dto';
import { UpdateTagVideoDto } from './dto/update-tag-video.dto';

@Injectable()
export class TagVideoService {
  create(createTagVideoDto: CreateTagVideoDto) {
    return 'This action adds a new tagVideo';
  }

  findAll() {
    return `This action returns all tagVideo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tagVideo`;
  }

  update(id: number, updateTagVideoDto: UpdateTagVideoDto) {
    return `This action updates a #${id} tagVideo`;
  }

  remove(id: number) {
    return `This action removes a #${id} tagVideo`;
  }
}
