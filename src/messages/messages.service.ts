import { Injectable, NotFoundException } from '@nestjs/common';
import { MessageEntity } from './entities/message-entity';
import { UpdateMessageDTO } from './dto/update-message.dto';
import { CreateMessageDTO } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  private lastId = 0;
  private readonly messages: MessageEntity[] = [];

  findAll() {
    return this.messages;
  }

  findOne(id: string) {
    const message = this.messages.find((message) => message.id === +id);

    if (message) return message;

    throw new NotFoundException('Message not found');
  }

  create(data: CreateMessageDTO) {
    this.lastId++;
    const id = this.lastId;

    const newMessage = {
      id,
      read: false,
      date: new Date(),
      ...data,
    };

    this.messages.push(newMessage);

    return newMessage;
  }

  update(id: string, data: UpdateMessageDTO) {
    const existingMessageIndex = this.messages.findIndex(
      (item) => item.id === +id,
    );

    if (existingMessageIndex < 0)
      throw new NotFoundException('Message not found');

    const existMessage = this.messages[existingMessageIndex];

    this.messages[existingMessageIndex] = {
      ...existMessage,
      ...data,
    };

    return this.messages[existingMessageIndex];
  }
  remove(id: string) {
    const existingMessageIndex = this.messages.findIndex(
      (item) => item.id === +id,
    );

    if (existingMessageIndex < 0)
      throw new NotFoundException('Message not found');

    const message = this.messages[existingMessageIndex];
    this.messages.splice(existingMessageIndex, 1);

    return message;
  }
}
