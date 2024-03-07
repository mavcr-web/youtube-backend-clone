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
import { ApiBody, ApiConsumes, ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { FfmpegCommand, ffprobe } from 'fluent-ffmpeg';

import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsCommand,
  S3Client,
} from '@aws-sdk/client-s3';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { JwtAuthGuard } from '../auth/jwt-guard.guard';
import {
  UserDecorator,
  UserDecoratorInterface,
} from 'shared/decorators/user.decorator';

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

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':visibility')
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
  async create(
    @UploadedFile() file: Express.Multer.File,
    @UserDecorator() user: UserDecoratorInterface,
    @Param('visibility') visibility: string,
  ) {
    return this.videoService.create(file, user, visibility);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async findAll(@UserDecorator() user: UserDecoratorInterface) {
    return this.videoService.findAll(user);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
    @UserDecorator() user: UserDecoratorInterface,
  ) {
    return this.videoService.findOne(id, user);
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
