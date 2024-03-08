import { IsDate, IsNumber, IsString, isString } from 'class-validator';

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
  visibility: string;

  @IsDate()
  uploadDate: Date;
}
