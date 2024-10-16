import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Message } from './entities/message-entity';
import { UpdateMessageDTO } from './dto/update-message.dto';
import { CreateMessageDTO } from './dto/create-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonService } from 'src/person/person.service';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { TokenPayloadDTO } from 'src/auth/dto/token-payload.dto';
import { ResponseMessageDTO } from './dto/response-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly personService: PersonService,
  ) {}

  async findAll(pagination?: PaginationDTO): Promise<ResponseMessageDTO[]> {
    const { limit, offset } = pagination;

    const messages = await this.messageRepository.find({
      relations: ['to', 'of'],
      take: limit, // Quantos registros quero exibir
      skip: offset, // A partir de qual registro quero exibir
      order: {
        id: 'desc',
      },
      select: {
        to: {
          id: true,
          name: true,
          email: true,
        },
        of: {
          id: true,
          name: true,
          email: true,
        },
      },
    });

    return messages;
  }

  async findOne(id: number): Promise<ResponseMessageDTO> {
    const message = await this.messageRepository.findOne({
      where: {
        id,
      },
      relations: ['to', 'of'],
    });
    if (!message) throw new NotFoundException('Message not found');

    return message;
  }

  async create(data: CreateMessageDTO, tokenPayload: TokenPayloadDTO) {
    const { toId } = data;

    const personToSendMessage = await this.personService.findOne(toId);
    const personToReceiveMessage = await this.personService.findOne(
      +tokenPayload.sub,
    );

    const newMessage = {
      read: false,
      date: new Date(),
      text: data.text,
      to: personToSendMessage,
      of: personToReceiveMessage,
    };

    const messageCreated = this.messageRepository.create(newMessage);
    await this.messageRepository.save(messageCreated);

    return {
      ...messageCreated,
      to: {
        id: messageCreated.to.id,
        name: messageCreated.to.name,
      },
      of: {
        id: messageCreated.of.id,
        name: messageCreated.of.name,
      },
    };
  }

  async update(
    id: number,
    data: UpdateMessageDTO,
    tokenPayload: TokenPayloadDTO,
  ) {
    const message = await this.findOne(id);

    if (message.of.id !== +tokenPayload.sub)
      throw new ForbiddenException('This message is not yours');

    message.text = data.text ?? message.text;
    message.read = data.read ?? message.read;

    await this.messageRepository.save(message);

    return message;
  }
  async remove(id: number, tokenPayload: TokenPayloadDTO) {
    const messageToDeleted = await this.findOne(id);

    if (messageToDeleted.of.id !== +tokenPayload.sub)
      throw new ForbiddenException('This message is not yours');

    if (!messageToDeleted) throw new NotFoundException('Message not found');

    await this.messageRepository.delete(messageToDeleted.id);
    return messageToDeleted;
  }
}
