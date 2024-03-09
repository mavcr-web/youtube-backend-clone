import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findUserToLogin(loginDto.username);
    if (!user) {
      return 'user not found';
    }
    const isMatch = await compare(loginDto.password, user.password);
    if (!isMatch) {
      return 'invalid password';
    }
    if (isMatch) {
      user.password = '';
      const payload = { user: user };
      const token = this.jwtService.sign(payload);
      const role = user.role;
      return { token, role };
    }
  }

  async register(registerDto: RegisterDto) {
    return this.userService.register({
      ...registerDto,
      role: 'user',
    });
  }

  async registerAdmin(registerDto: RegisterDto) {
    return this.userService.register({
      ...registerDto,
      role: 'admin',
    });
  }

  async registerFirstAdmin(registerDto: RegisterDto) {
    return this.userService.firstRegister({
      username: registerDto.username,
      password: registerDto.password,
      role: 'admin',
    });
  }
}
