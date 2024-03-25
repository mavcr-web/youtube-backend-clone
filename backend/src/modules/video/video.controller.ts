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
  UploadedFiles,
  Query,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ApiBody, ApiConsumes, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-guard.guard';
import {
  UserDecorator,
  UserDecoratorInterface,
} from 'shared/decorators/user.decorator';
import { Visibility } from './entities/video.entity';

@ApiTags('video')
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':visibility')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'video', maxCount: 2 },
      { name: 'thumbnail', maxCount: 2 },
    ]),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        video: {
          // video
          // type: 'string',
          // format: 'binary',
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },

        thumbnail: {
          // thumbnail
          // type: 'string',
          // format: 'binary',
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  async create(
    @UploadedFiles()
    files: { video: Express.Multer.File[]; thumbnail: Express.Multer.File[] },
    @UserDecorator() user: UserDecoratorInterface,
    // @Param('visibility') visibility: Visibility,
    // @Query('name') name: string,
    // @Query('description') description: string,
  ) {
    // console.log(files[0].originalname);

    // const video = files[0];
    // const thumbnail = files[1];
    // return this.videoService.create(
    //   video,
    //   thumbnail,
    //   user,
    //   visibility,
    //   name,
    //   description,
    // );

    let f2 = files.video.map((file) => file.originalname);
    f2 = [...f2, ...files.thumbnail.map((file) => file.originalname)];
    return f2;
  }

  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @Post('/thumbnail/:id')
  @UseInterceptors(FileInterceptor('thumbnail'))
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
  async thumbnail(
    @UploadedFile() file: Express.Multer.File,
    @UserDecorator() user: UserDecoratorInterface,
    @Param('id') id: number,
  ) {
    return this.videoService.thumbnail(file, user, id);
  }

  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @Get('')
  async findAll(
    @Query('title') title: string,
    @UserDecorator() user: UserDecoratorInterface,
  ) {
    return this.videoService.findAll(title, user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/my-videos')
  async findAllMyVideos(@UserDecorator() user: UserDecoratorInterface) {
    return this.videoService.findAllMyVideos(user);
  }

  @Get('/channel-videos/:id')
  async findAllChanelVideos(@Param(':id') id: number) {
    return this.videoService.findAllChannelVideos(id);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
    @UserDecorator() user: UserDecoratorInterface,
  ) {
    return this.videoService.findOne(id, user);
  }

  @Get('/entity/:id')
  async findOneEntity(@Param('id') id: number) {
    return this.videoService.findOneEntity(id);
  }

  @Get('/thumbnail/:id')
  async findOneThumbnail(
    @Param('id') id: number,
    @UserDecorator() user: UserDecoratorInterface,
  ) {
    return this.videoService.findOneThumbnail(id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videoService.update(+id, updateVideoDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async remove(
    @Param('id') id: number,
    @UserDecorator() user: UserDecoratorInterface,
  ) {
    return this.videoService.remove(id, user);
  }
}
