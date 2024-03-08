import { PartialType } from '@nestjs/mapped-types';
import { CreateTagVideoDto } from './create-tag-video.dto';

export class UpdateTagVideoDto extends PartialType(CreateTagVideoDto) {}
