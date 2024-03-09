import { IsNumber } from 'class-validator';

export class CreateLikeVideoDto {
  @IsNumber()
  idVideo: number;

  @IsNumber()
  idUser: number;
}
