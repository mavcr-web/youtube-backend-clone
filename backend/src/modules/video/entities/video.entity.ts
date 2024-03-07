import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  keyCloud: string;

  @Column()
  uploadDate: Date;

  @Column()
  idUser: number;

  @Column()
  visibility: string;
}
