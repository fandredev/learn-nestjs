import { MessageEntity } from '../entities/message-entity';

type CreateRecadoDTO = Pick<MessageEntity, 'text' | 'of' | 'to'>;

export class CreateMessageDTO implements CreateRecadoDTO {
  readonly text: string;
  readonly of: string;
  readonly to: string;
}
