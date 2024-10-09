import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { MessageEntity } from '../entities/message-entity';

type UpdateRecadoDTO = Partial<MessageEntity>;

export class UpdateMessageDTO implements UpdateRecadoDTO {
  @IsDate()
  @IsOptional()
  date?: Date;

  @IsString()
  @IsOptional()
  readonly of: string;

  @IsString()
  @IsOptional()
  readonly to: string;

  @IsOptional()
  @IsBoolean()
  read?: boolean;

  @IsString({
    message: 'the `text` needs a valid text',
  })
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  readonly text: string;
}
