import {
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Message } from '../entities/message-entity';
import { ApiProperty } from '@nestjs/swagger';

type CreateRecadoDTO = Pick<Message, 'text'>;

export class CreateMessageDTO implements CreateRecadoDTO {
  @ApiProperty({
    example: 'This is a example',
    description: 'The content of the message',
    minLength: 5,
    maxLength: 255,
  })
  @IsString({
    message: 'the `text` needs a valid text',
  })
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  readonly text: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of person that you need send a message',
    minLength: 5,
    maxLength: 255,
  })
  @IsPositive()
  readonly toId: number;
}
