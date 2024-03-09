import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  idVideo: number;

  @IsNumber()
  idUser: number;

  @IsString()
  comment: string;
}
