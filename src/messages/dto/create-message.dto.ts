import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { MessageEntity } from '../entities/message-entity';

type CreateRecadoDTO = Pick<MessageEntity, 'text' | 'of' | 'to'>;

export class CreateMessageDTO implements CreateRecadoDTO {
  @IsString({
    message: 'the `text` needs a valid text',
  })
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  readonly text: string;

  @IsString()
  @IsNotEmpty()
  readonly of: string;

  @IsString()
  @IsNotEmpty()
  readonly to: string;
}
