import { Injectable } from '@nestjs/common';

export interface Message {
  message: string;
  user: string;
  id: number;
}

@Injectable()
export class MessagesService {
  private readonly messages: Message[] = [
    {
      message: 'Mensagem',
      user: 'Felipe',
      id: 1,
    },
    {
      message: 'Olá',
      user: 'Júlia',
      id: 3,
    },
  ];

  findAllMessages() {
    return this.messages;
  }

  findEspecificMessage(id: string) {
    return this.messages.find((message) => message.id === +id);
  }
}
