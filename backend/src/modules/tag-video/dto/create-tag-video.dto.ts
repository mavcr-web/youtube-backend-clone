import { IsNumber } from 'class-validator';

export class CreateTagVideoDto {
  @IsNumber()
  idVideo: number;

  @IsNumber()
  idTag: number;
}
