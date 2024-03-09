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

    if (!dbUser) {
      const newUser = await this.userRepository.save(createUserDto);
      return newUser;
    }
  }

  async firstRegister(createUserDto: CreateUserDto) {
    const dbUser = await this.userRepository.find();

    const encryptedPassword = await hash(createUserDto.password, 10);
    createUserDto.password = encryptedPassword;

    if (dbUser.length === 0) {
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

  async checkIfDoesNotExistUserInDb() {
    const db = await this.userRepository.find({ take: 1 });
    if (db.length === 0) {
      return true;
    }
    return false;
  }
}
