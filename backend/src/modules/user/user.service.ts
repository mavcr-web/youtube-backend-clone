import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const dbUser = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });

    const encryptedPassword = await hash(createUserDto.password, 10);
    createUserDto.password = encryptedPassword;
    if (!dbUser) {
      const newUser = await this.userRepository.save(createUserDto);
      return newUser;
    }
  }

  async register(createUserDto: CreateUserDto) {
    const dbUser = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });

    const encryptedPassword = await hash(createUserDto.password, 10);
    createUserDto.password = encryptedPassword;
    createUserDto.role = 'user';
    if (!dbUser) {
      const newUser = await this.userRepository.save(createUserDto);
      return newUser;
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    console.log(id);
    
    const db = await this.userRepository.findOne({ where: { id: id } });
    db.password = undefined;
    return db;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserToLogin(username: string) {
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    return user;
  }
}
