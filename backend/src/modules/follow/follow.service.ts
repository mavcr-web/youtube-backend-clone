import { Injectable } from '@nestjs/common';
import { CreateFollowDto } from './dto/create-follow.dto';
import { UpdateFollowDto } from './dto/update-follow.dto';
import { Follow } from './entities/follow.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>,
  ) {}
  async create(createFollowDto: CreateFollowDto, idUser: number) {
    const db = await this.followRepository.findOne({
      where: {
        idUser: idUser,
        idFollowed: createFollowDto.idFollowed,
      },
    });

    if (!db) {
      const dbFollow = await this.followRepository.save({
        ...createFollowDto,
        idUser: idUser,
      });
      return dbFollow;
    }
  }

  findAll() {
    return `This action returns all follow`;
  }

  async findOne(idUser: number, idFollowed: number) {
    const db = await this.followRepository.findOne({
      where: {
        idUser: idUser,
        idFollowed: idFollowed,
      },
    });

    if (db) {
      return true;
    } else {
      return false;
    }
  }

  update(id: number, updateFollowDto: UpdateFollowDto) {
    return `This action updates a #${id} follow`;
  }

  remove(id: number) {
    return this.followRepository.delete(id);
  }
}
