import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ default: 'new user' })
  @IsString()
  username: string;

  @ApiProperty({ default: '1234' })
  @IsString()
  password: string;
}
