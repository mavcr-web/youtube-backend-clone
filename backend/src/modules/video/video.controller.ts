import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';

import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsCommand,
  S3Client,
} from '@aws-sdk/client-s3';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { JwtAuthGuard } from '../auth/jwt-guard.guard';

@ApiTags('video')
@Controller('video')
export class VideoController {
  
  private s3Client = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
  constructor(private readonly videoService: VideoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('video'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async create(@UploadedFile() file: Express.Multer.File) {
    try {
      const fileExtName: string = file.originalname.split('.')[1];

      console.log('buffer', file.buffer);

      const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${Date.now()}.${fileExtName}`,
        Body: file.buffer,
      });

      const response = await this.s3Client.send(command);
      return { upload: 'success' };
    } catch (error) {
      console.log('error', error);
    }
  }
  // create(@Body() createVideoDto: CreateVideoDto, @UploadedFile() file: Express.Multer.File) {
  //   return this.videoService.create(createVideoDto);
  // }
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    try {
      const command = new ListObjectsCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
      });

      return await this.s3Client.send(command);
    } catch (error) {
      console.log('error', error);
    }
    // return this.videoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${id}`,
      });

      const url = await getSignedUrl(this.s3Client, command, {
        expiresIn: 3600,
      });

      return { url };
    } catch (error) {
      console.log('error', error);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videoService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${id}`,
      });

      await this.s3Client.send(command);
    } catch (error) {
      console.log('error', error);
    }
  }
}
