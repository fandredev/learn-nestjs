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
  UsePipes,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDTO } from './dto/create-message.dto';
import { UpdateMessageDTO } from './dto/update-message.dto';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import ParseIntIdPipe from 'src/common/pipes/parse-int-id.pipe';

@Controller('messages')
@UsePipes(ParseIntIdPipe)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  findAll(@Query() pagination: PaginationDTO) {
    return this.messagesService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.messagesService.findOne(id);
  }

  @Post()
  create(@Body() messageBody: CreateMessageDTO) {
    return this.messagesService.create(messageBody);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() messageBody: UpdateMessageDTO) {
    return this.messagesService.update(id, messageBody);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.messagesService.remove(id);
  }
}
