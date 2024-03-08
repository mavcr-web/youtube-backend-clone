import { IsDate, IsNumber, IsString, isString } from 'class-validator';
import { Visibility } from '../entities/video.entity';

export class CreateVideoDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  keyCloud: string;

  @IsString()
  thumbnailKeyCloud: string;

  @IsNumber()
  idUser: number;

  @IsString()
  visibility: Visibility;

  @IsDate()
  uploadDate: Date;
}
