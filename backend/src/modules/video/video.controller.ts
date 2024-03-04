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

@ApiTags('video')
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('asd', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename: string = file.originalname.split('.')[0];
          const fileExtName: string = file.originalname.split('.')[1];
          cb(null, `${filename}-${Date.now()}.${fileExtName}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiParam({
    name: 'asd',
    required: true,
    type: 'file',
  })
  async create(@UploadedFile() file: Express.Multer.File) {
    console.log(file);

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
