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
import { FollowService } from './follow.service';
import { CreateFollowDto } from './dto/create-follow.dto';
import { UpdateFollowDto } from './dto/update-follow.dto';
import {
  UserDecorator,
  UserDecoratorInterface,
} from 'shared/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/jwt-guard.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(
    @Body() createFollowDto: CreateFollowDto,
    @UserDecorator() user: UserDecoratorInterface,
  ) {
    return this.followService.create(createFollowDto, user.id);
  }

  @Get()
  findAll() {
    return this.followService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(
    @Param('id') id: number,
    @UserDecorator() user: UserDecoratorInterface,
  ) {
    return this.followService.findOne(id, user.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFollowDto: UpdateFollowDto) {
    return this.followService.update(+id, updateFollowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.followService.remove(+id);
  }
}
