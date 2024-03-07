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

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.videoService.remove(id);
  }
}
