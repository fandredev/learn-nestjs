import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageDTO } from './create-message.dto';
import { IsBoolean, IsOptional } from 'class-validator';

// Isso aqui basicamente extende toda a class CreateMessage
export class UpdateMessageDTO extends PartialType(CreateMessageDTO) {
  @IsBoolean()
  @IsOptional()
  readonly read?: boolean;
}
