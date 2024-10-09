import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Message, MessagesService } from './messages.service';

interface MessageResponse {
  message: string;
  user: string;
}

interface PaginationProps {
  limit: string;
  offset: string;
}

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  findAll(@Query() pagination: PaginationProps): Message[] {
    console.log(pagination);

    return this.messagesService.findAllMessages();
  }

  @Get(':id') // Create a dynamic route
  findOne(@Param('id') id: string) {
    // Take the value ID
    return this.messagesService.findEspecificMessage(id);
  }

  @Post()
  create(@Body() body: MessageResponse) {
    return {};
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: MessageResponse) {
    return {
      id,
      ...body,
    };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'Delete id' + id;
  }
}
