import { IsNumber } from 'class-validator';

export class CreateHistoryDto {
  @IsNumber()
  idUser: number;

  @IsNumber()
  idVideo: number;
}
