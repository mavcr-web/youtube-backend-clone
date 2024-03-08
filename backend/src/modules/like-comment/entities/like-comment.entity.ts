import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LikeComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idComment: string;

  @Column()
  idUser: string;
}
