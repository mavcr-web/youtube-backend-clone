import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idVideo: number;

  @Column()
  idUser: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  username: string;

  @Column()
  comment: string;

  @Column()
  date: Date;
}
