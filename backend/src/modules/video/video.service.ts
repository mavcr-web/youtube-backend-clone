import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from './entities/video.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDecoratorInterface } from 'shared/decorators/user.decorator';
import {
  GetObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class VideoService {
  private s3Client = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  async create(
    file: Express.Multer.File,
    user: UserDecoratorInterface,
    visibility: string,
  ) {
    try {
      const fileExtName: string = file.originalname.split('.')[1];

      const key = `${Date.now()}.${fileExtName}`;

      const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
      });

      const response = await this.s3Client.send(command);

      const createVideoDto: CreateVideoDto = {
        title: file.originalname,
        description: file.originalname,
        idUser: user.id,
        keyCloud: key,
        visibility: visibility,
        uploadDate: new Date(),
      };

      const db = await this.videoRepository.save(createVideoDto);
      return db;
    } catch (error) {
      return { error: error.message };
    }
  }

  async findAll(user: UserDecoratorInterface) {
    try {
      if (user.role != 'admin') {
        throw new Error('Unauthorized');
      }
      const command = new ListObjectsCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
      });

      return await this.s3Client.send(command);
    } catch (error) {
      console.log('error', error);
      return { error: error.message };
    }
  }

  async findOne(id: number, user: UserDecoratorInterface) {
    try {
      const db = await this.videoRepository.findOne({ where: { id: id } });

      if (!db) {
        throw new Error('Video not found');
      }

      if (db.visibility === 'private' && db.idUser !== user.id) {
        throw new Error('Unauthorized');
      }

      const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${db.keyCloud}`,
      });

      const url = await getSignedUrl(this.s3Client, command, {
        expiresIn: 3600,
      });

      return { url };
    } catch (error) {
      console.log('error', error);
    }
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
