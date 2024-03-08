import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idUser: string;

  @Column()
  idFollowed: string;
}
