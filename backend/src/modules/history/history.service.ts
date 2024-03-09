import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { History } from './entities/history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,
  ) {}
  async create(createHistoryDto: CreateHistoryDto, idUser: number) {
    try {
      createHistoryDto.idUser = idUser;
      const db = await this.historyRepository.save(createHistoryDto);

      return db;
    } catch (error) {
      return { error: error.message };
    }
  }

  async findAll(id: number) {
    try {
      const where: any = {};
      id ? (where.idUser = id) : null;

      return await this.historyRepository.find({
        take: 100,
        where: where,
        order: { id: 'DESC' },
      });
    } catch (error) {
      console.log('error', error);
      return { error: error.message };
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} history`;
  // }

  // update(id: number, updateHistoryDto: UpdateHistoryDto) {
  //   return `This action updates a #${id} history`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} history`;
  // }
}
