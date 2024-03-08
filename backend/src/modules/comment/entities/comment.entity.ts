import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idVideo: string;

  @Column()
  idUser: string;

  @Column()
  comment: string;

  @Column()
  date: Date;
}
