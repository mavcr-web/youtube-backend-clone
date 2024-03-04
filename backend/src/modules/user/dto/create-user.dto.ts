import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ default: 'new user' })
  @IsString()
  username: string;

  @ApiProperty({ default: '1234' })
  @IsString()
  password: string;
}
