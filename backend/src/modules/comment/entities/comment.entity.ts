import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idVideo: number;

  @Column()
  idUser: number;

  @Column()
  username: string;

  @Column()
  comment: string;

  @Column()
  date: Date;
}
