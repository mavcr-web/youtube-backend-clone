import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LikeVideo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idVideo: number;

  @Column()
  idUser: number;
}
