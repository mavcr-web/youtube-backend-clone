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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';

import { PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import { createReadStream } from 'fs';

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
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: 'uploads',
        filename: (req, file, cb) => {
          const filename: string = file.originalname.split('.')[0];
          const fileExtName: string = file.originalname.split('.')[1];
          cb(null, `${filename}-${Date.now()}.${fileExtName}`);
        },
      }),
    }),
  )
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
    console.log(process.env.AWS_BUCKET_NAME);
    console.log(process.env.AWS_BUCKET_REGION);
    console.log(process.env.AWS_ACCESS_KEY_ID);
    console.log(process.env.AWS_SECRET_ACCESS_KEY);
    console.log(this.s3Client);

    console.log('file', file);

    try {
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,
      });

      const response = await this.s3Client.send(command);
      console.log('response', response);
    } catch (error) {
      console.log('error', error);
      
    }
    return file.filename;
  }
  // create(@Body() createVideoDto: CreateVideoDto, @UploadedFile() file: Express.Multer.File) {
  //   return this.videoService.create(createVideoDto);
  // }

  @Get()
  findAll() {
    return this.videoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videoService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoService.remove(+id);
  }
}
