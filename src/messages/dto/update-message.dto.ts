import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMessageDTO } from './create-message.dto';
import { IsBoolean, IsOptional } from 'class-validator';

// Isso aqui basicamente extende toda a class CreateMessage
export class UpdateMessageDTO extends PartialType(CreateMessageDTO) {
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example: false,
    description: 'The messages readed?',
    required: false,
  })
  readonly read?: boolean;
}
