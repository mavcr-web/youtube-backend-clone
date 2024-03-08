import { PartialType } from '@nestjs/swagger';
import { CreateLikeCommentDto } from './create-like-comment.dto';

export class UpdateLikeCommentDto extends PartialType(CreateLikeCommentDto) {}
