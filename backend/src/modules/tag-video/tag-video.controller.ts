import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TagVideoService } from './tag-video.service';
import { CreateTagVideoDto } from './dto/create-tag-video.dto';
import { UpdateTagVideoDto } from './dto/update-tag-video.dto';

@Controller('tag-video')
export class TagVideoController {
  constructor(private readonly tagVideoService: TagVideoService) {}

  @Post()
  create(@Body() createTagVideoDto: CreateTagVideoDto) {
    return this.tagVideoService.create(createTagVideoDto);
  }

  @Get()
  findAll(@Query('id') ids: number[]) {
    return this.tagVideoService.findAllById(ids);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tagVideoService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTagVideoDto: UpdateTagVideoDto) {
  //   return this.tagVideoService.update(+id, updateTagVideoDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tagVideoService.remove(+id);
  }
}
