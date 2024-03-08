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
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ApiBody, ApiConsumes, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-guard.guard';
import {
  UserDecorator,
  UserDecoratorInterface,
} from 'shared/decorators/user.decorator';

@ApiTags('video')
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':visibility')
  @UseInterceptors(FilesInterceptor('video'))
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
    @UploadedFiles() files: Express.Multer.File,
    @UserDecorator() user: UserDecoratorInterface,
    @Param('visibility') visibility: string,
  ) {
    const video = files[0];
    const thumbnail = files[1];
    return this.videoService.create(video, thumbnail, user, visibility);
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
  @Get()
  async findAll(@UserDecorator() user: UserDecoratorInterface) {
    return this.videoService.findAll(user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/my-videos')
  async findAllMyVideos(@UserDecorator() user: UserDecoratorInterface) {
    return this.videoService.findAllMyVideos(user);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
    @UserDecorator() user: UserDecoratorInterface,
  ) {
    return this.videoService.findOne(id, user);
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
