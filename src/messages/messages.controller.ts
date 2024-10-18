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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseMessageDTO } from './dto/response-message.dto';

@ApiTags('Messages')
@Controller('messages')
@UsePipes(ParseIntIdPipe)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  @UseInterceptors(TimingConnectionInterceptor)
  @ApiOperation({ summary: 'Get all messages' })
  @ApiQuery({
    name: 'offset',
    required: false,
    example: 1,
    description: 'Itens a pular',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
    description: 'Limite de itens por página',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Messages list returns with success',
    type: [ResponseMessageDTO],
  })
  findAll(@Query() pagination: PaginationDTO) {
    return this.messagesService.findAll(pagination);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one especific message' })
  @UseInterceptors(AddHeaderInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Especific message returns with success',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found Message ID',
    type: ResponseMessageDTO,
  })
  findOne(@Param('id') id: number) {
    return this.messagesService.findOne(id);
  }

  @Post()
  @UseGuards(AuthTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new message' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Message created with success',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Invalid data',
  })
  create(
    @Body() messageBody: CreateMessageDTO,
    @TokenPayloadParam() tokenPayload: TokenPayloadDTO,
  ) {
    return this.messagesService.create(messageBody, tokenPayload);
  }

  @Patch(':id')
  @UseGuards(AuthTokenGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an existing message' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Message update with success',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found ID',
  })
  update(
    @Param('id') id: number,
    @Body() messageBody: UpdateMessageDTO,
    @TokenPayloadParam() tokenPayload: TokenPayloadDTO,
  ) {
    return this.messagesService.update(id, messageBody, tokenPayload);
  }

  @UseGuards(AuthTokenGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiOperation({ summary: 'Update an existing message' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Message deleted with success',
  })
  remove(
    @Param('id') id: number,
    @TokenPayloadParam() tokenPayload: TokenPayloadDTO,
  ) {
    return this.messagesService.remove(id, tokenPayload);
  }
}
