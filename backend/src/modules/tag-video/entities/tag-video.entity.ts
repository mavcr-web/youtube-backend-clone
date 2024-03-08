import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TagVideo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idVideo: string;

  @Column()
  idTag: string;
}
