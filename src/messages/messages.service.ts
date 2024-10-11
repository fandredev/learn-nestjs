import { Injectable, NotFoundException } from '@nestjs/common';
import { Message } from './entities/message-entity';
import { UpdateMessageDTO } from './dto/update-message.dto';
import { CreateMessageDTO } from './dto/create-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async findAll() {
    const messages = await this.messageRepository.find();

    return messages;
  }

  async findOne(id: number) {
    const message = await this.messageRepository.findOne({
      where: {
        id,
      },
    });
    if (!message) throw new NotFoundException('Message not found');

    return message;
  }

  async create(data: CreateMessageDTO) {
    const newMessage = {
      read: false,
      date: new Date(),
      ...data,
    };

    const messageCreated = this.messageRepository.create(newMessage);

    return this.messageRepository.save(messageCreated);
  }

  async update(id: number, data: UpdateMessageDTO) {
    const partialUpdateMessageDTO = {
      read: data?.read,
      text: data?.text,
    };
    // .preload - Atualiza as coisas

    const messageToUpdated = await this.messageRepository.preload({
      id,
      ...partialUpdateMessageDTO,
    });

    if (!messageToUpdated) throw new NotFoundException('Message not found');

    return this.messageRepository.save(messageToUpdated);
  }
  async remove(id: number) {
    const messageToDeleted = await this.messageRepository.findOneBy({
      id,
    });

    if (!messageToDeleted) throw new NotFoundException('Message not found');

    return this.messageRepository.remove(messageToDeleted);
  }
}
