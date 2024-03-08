import { PartialType } from '@nestjs/swagger';
import { CreateLikeVideoDto } from './create-like-video.dto';

export class UpdateLikeVideoDto extends PartialType(CreateLikeVideoDto) {}
