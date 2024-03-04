import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: [] })
  tags: string[];

  @Column()
  uploadDate: Date;

  @Column()
  idUser: number;
}
