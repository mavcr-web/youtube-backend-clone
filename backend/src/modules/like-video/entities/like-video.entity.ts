import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LikeVideo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idVideo: string;

  @Column()
  idUser: string;
}
