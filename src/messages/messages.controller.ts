import { Controller, Get, Param, Post } from '@nestjs/common';
import { Message, MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  findAll(): Message[] {
    return this.messagesService.findAllMessages();
  }

  @Get(':id') // Create a dynamic route
  findOne(@Param('id') id: string) {
    // Take the value ID
    return this.messagesService.findEspecificMessage(id);
  }

  @Post()
  create() {
    return {};
  }
}
