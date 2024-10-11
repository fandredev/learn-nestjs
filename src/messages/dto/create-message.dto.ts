import {
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Message } from '../entities/message-entity';

type CreateRecadoDTO = Pick<Message, 'text'>;

export class CreateMessageDTO implements CreateRecadoDTO {
  @IsString({
    message: 'the `text` needs a valid text',
  })
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  readonly text: string;

  @IsPositive()
  readonly ofId: number;

  @IsPositive()
  readonly toId: number;
}
