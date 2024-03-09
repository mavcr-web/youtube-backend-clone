import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video, Visibility } from './entities/video.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { UserDecoratorInterface } from 'shared/decorators/user.decorator';
import {
  DeleteObjectCommand,
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
    video: Express.Multer.File,
    thumbnail: Express.Multer.File,
    user: UserDecoratorInterface,
    visibility: Visibility,
    name: string,
    description: string,
  ) {
    try {
      console.log(name, description, visibility, user.id);

      // video
      const videoExtName: string = video.originalname.split('.')[1];

      const key = `${Date.now()}.${videoExtName}`;

      const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: video.buffer,
      });

      await this.s3Client.send(command);

      // thumbnail
      const thumbnailExtName: string = thumbnail.originalname.split('.')[1];

      const keyThumbnail = `${Date.now()}.${thumbnailExtName}`;

      const commandThumbnail = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: keyThumbnail,
        Body: thumbnail.buffer,
      });

      await this.s3Client.send(commandThumbnail);

      // db
      const createVideoDto: CreateVideoDto = {
        title: name.toLowerCase(),
        description: description.toLowerCase(),
        idUser: user.id,
        keyCloud: key,
        thumbnailKeyCloud: keyThumbnail,
        visibility: visibility,
        uploadDate: new Date(),
      };

      console.log('createVideoDto', createVideoDto);

      const db = await this.videoRepository.save(createVideoDto);
      return db;
    } catch (error) {
      console.log('error', error);

      return { error: error.message };
    }
  }

  async thumbnail(
    file: Express.Multer.File,
    user: UserDecoratorInterface,
    id: number,
  ) {
    try {
      const db = await this.videoRepository.findOne({ where: { id: id } });
      const fileExtName: string = file.originalname.split('.')[1];

      const key = `${Date.now()}.${fileExtName}`;

      const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
      });

      const response = await this.s3Client.send(command);

      const dbUpdated = await this.videoRepository.update(
        { id: id },
        { thumbnailKeyCloud: key },
      );
      return dbUpdated;
    } catch (error) {
      return { error: error.message };
    }
  }

  async findAll(title: string, user: UserDecoratorInterface) {
    try {
      // if (user.role != 'admin') {
      //   throw new Error('Unauthorized');
      // }
      // const command = new ListObjectsCommand({
      //   Bucket: process.env.AWS_BUCKET_NAME,
      // });

      // return await this.s3Client.send(command);
      const where: any = {};
      where.visibility = 'public';
      title && title !== ''
        ? (where.title = Like(`%${title.toLowerCase()}%`))
        : null;

      return await this.videoRepository.find({
        take: 100,
        where: where,
      });
    } catch (error) {
      console.log('error', error);
      return { error: error.message };
    }
  }

  async findAllMyVideos(user: UserDecoratorInterface) {
    try {
      // if (user.role != 'admin') {
      //   throw new Error('Unauthorized');
      // }
      // const command = new ListObjectsCommand({
      //   Bucket: process.env.AWS_BUCKET_NAME,
      // });

      // return await this.s3Client.send(command);

      return await this.videoRepository.find({
        take: 100,
        where: { idUser: user.id },
      });
    } catch (error) {
      return { error: error.message };
    }
  }

  async findAllChannelVideos(idChannel: number, user: UserDecoratorInterface) {
    try {
      // if (user.role != 'admin') {
      //   throw new Error('Unauthorized');
      // }
      // const command = new ListObjectsCommand({
      //   Bucket: process.env.AWS_BUCKET_NAME,
      // });

      // return await this.s3Client.send(command);

      return await this.videoRepository.find({
        take: 100,
        where: { idUser: idChannel },
      });
    } catch (error) {
      return { error: error.message };
    }
  }

  async findOne(id: number, user: UserDecoratorInterface) {
    try {
      const db = await this.videoRepository.findOne({ where: { id: id } });

      if (!db) {
        throw new Error('Video not found');
      }

      // if (db.visibility === 'private' && db.idUser !== user.id) {
      //   throw new Error('Unauthorized');
      // }

      const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${db.keyCloud}`,
      });

      const url = await getSignedUrl(this.s3Client, command, {
        expiresIn: 3600,
      });

      return { url, idUser: db.idUser };
    } catch (error) {
      console.log('error', error);
    }
  }

  async findOneEntity(id: number) {
    try {
      const db = await this.videoRepository.findOne({ where: { id: id } });

      if (!db) {
        throw new Error('Video not found');
      }

      return db;
    } catch (error) {
      console.log('error', error);
    }
  }

  async findOneThumbnail(id: number, user: UserDecoratorInterface) {
    try {
      const db = await this.videoRepository.findOne({ where: { id: id } });

      if (!db) {
        throw new Error('Video not found');
      }

      // if (db.visibility === 'private' && db.idUser !== user.id) {
      //   throw new Error('Unauthorized');
      // }

      const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${db.thumbnailKeyCloud}`,
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

  async remove(id: number, user: UserDecoratorInterface) {
    try {
      const db = await this.videoRepository.findOne({ where: { id: id } });

      if (!db) {
        throw new Error('Video not found');
      }

      if (user.role != 'admin' && db.idUser !== user.id) {
        throw new Error('Unauthorized');
      }

      if (db.keyCloud) {
        const commandVideo = new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `${db.keyCloud}`,
        });
        await this.s3Client.send(commandVideo);
      }

      if (db.thumbnailKeyCloud) {
        const commandThumbnail = new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `${db.thumbnailKeyCloud}`,
        });
        await this.s3Client.send(commandThumbnail);
      }

      const deleted = await this.videoRepository.delete({ id: id });
      return deleted;
    } catch (error) {
      console.log('error', error);
    }
  }
}
