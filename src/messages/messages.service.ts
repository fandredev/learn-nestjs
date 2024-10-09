import { Injectable, NotFoundException } from '@nestjs/common';
import { MessageEntity } from './entities/message-entity';

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

  create(body: any) {
    this.lastId++;
    const id = this.lastId;

    const newMessage = {
      id,
      ...body,
    };

    this.messages.push(newMessage);

    return newMessage;
  }

  update(id: string, updateMessageDTO: any) {
    const existingMessageIndex = this.messages.findIndex(
      (item) => item.id === +id,
    );

    if (existingMessageIndex < 0)
      throw new NotFoundException('Message not found');

    const existMessage = this.messages[existingMessageIndex];

    this.messages[existingMessageIndex] = {
      ...existMessage,
      ...updateMessageDTO,
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
