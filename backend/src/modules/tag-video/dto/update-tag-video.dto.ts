import { PartialType } from '@nestjs/swagger';
import { CreateTagVideoDto } from './create-tag-video.dto';

export class UpdateTagVideoDto extends PartialType(CreateTagVideoDto) {}
