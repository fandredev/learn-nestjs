import { MessageEntity } from '../entities/message-entity';

type UpdateRecadoDTO = Partial<MessageEntity>;

export class UpdateMessageDTO implements UpdateRecadoDTO {}
