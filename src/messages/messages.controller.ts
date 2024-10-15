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
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDTO } from './dto/create-message.dto';
import { UpdateMessageDTO } from './dto/update-message.dto';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import ParseIntIdPipe from 'src/common/pipes/parse-int-id.pipe';
import { AddHeaderInterceptor } from 'src/common/interceptors/add-header.interceptor';
import { TimingConnectionInterceptor } from 'src/common/interceptors/timing-connection.interceptor';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';
import { TokenPayloadParam } from 'src/auth/params/token-payload.param';
import { TokenPayloadDTO } from 'src/auth/dto/token-payload.dto';

@Controller('messages')
@UsePipes(ParseIntIdPipe)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  @UseInterceptors(TimingConnectionInterceptor)
  findAll(@Query() pagination: PaginationDTO) {
    return this.messagesService.findAll(pagination);
  }

  @Get(':id')
  @UseInterceptors(AddHeaderInterceptor)
  findOne(@Param('id') id: number) {
    return this.messagesService.findOne(id);
  }

  @Post()
  @UseGuards(AuthTokenGuard)
  create(
    @Body() messageBody: CreateMessageDTO,
    @TokenPayloadParam() tokenPayload: TokenPayloadDTO,
  ) {
    return this.messagesService.create(messageBody, tokenPayload);
  }

  @Patch(':id')
  @UseGuards(AuthTokenGuard)
  update(
    @Param('id') id: number,
    @Body() messageBody: UpdateMessageDTO,
    @TokenPayloadParam() tokenPayload: TokenPayloadDTO,
  ) {
    return this.messagesService.update(id, messageBody, tokenPayload);
  }

  @UseGuards(AuthTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(
    @Param('id') id: number,
    @TokenPayloadParam() tokenPayload: TokenPayloadDTO,
  ) {
    return this.messagesService.remove(id, tokenPayload);
  }
}
