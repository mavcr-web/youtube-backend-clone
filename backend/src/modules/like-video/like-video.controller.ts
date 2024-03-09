import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { LikeVideoService } from './like-video.service';
import { CreateLikeVideoDto } from './dto/create-like-video.dto';
import { UpdateLikeVideoDto } from './dto/update-like-video.dto';
import { JwtAuthGuard } from '../auth/jwt-guard.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  UserDecorator,
  UserDecoratorInterface,
} from 'shared/decorators/user.decorator';

@Controller('like-video')
export class LikeVideoController {
  constructor(private readonly likeVideoService: LikeVideoService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(
    @Body() createLikeVideoDto: CreateLikeVideoDto,
    @UserDecorator() user: UserDecoratorInterface,
  ) {
    return this.likeVideoService.create(createLikeVideoDto, user.id);
  }

  @Get()
  findAll(@Query('id') idVideo: number) {
    return this.likeVideoService.findAll(idVideo);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(
    @Param('id') id: number,
    @UserDecorator() user: UserDecoratorInterface,
  ) {
    return this.likeVideoService.findOne(id, user.id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateLikeVideoDto: UpdateLikeVideoDto,
  // ) {
  //   return this.likeVideoService.update(+id, updateLikeVideoDto);
  // }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(
    @Param('id') id: number,
    @UserDecorator() user: UserDecoratorInterface,
  ) {
    return this.likeVideoService.remove(id, user.id);
  }
}
