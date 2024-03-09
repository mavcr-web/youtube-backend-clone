import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LikeCommentService } from './like-comment.service';
import { CreateLikeCommentDto } from './dto/create-like-comment.dto';
import { UpdateLikeCommentDto } from './dto/update-like-comment.dto';
import { JwtAuthGuard } from '../auth/jwt-guard.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  UserDecorator,
  UserDecoratorInterface,
} from 'shared/decorators/user.decorator';

@Controller('like-comment')
export class LikeCommentController {
  constructor(private readonly likeCommentService: LikeCommentService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(
    @Body() createLikeCommentDto: CreateLikeCommentDto,
    @UserDecorator() user: UserDecoratorInterface,
  ) {
    return this.likeCommentService.create(createLikeCommentDto, user.id);
  }

  @Get()
  findAll() {
    return this.likeCommentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likeCommentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLikeCommentDto: UpdateLikeCommentDto,
  ) {
    return this.likeCommentService.update(+id, updateLikeCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likeCommentService.remove(+id);
  }
}
