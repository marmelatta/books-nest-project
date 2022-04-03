import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './model/create-book.dto';
import { BookDocument } from '../entities/book.entity';
import { ExceptionInterceptor } from '../interceptors/exception.interceptor';
import { BodyValidatorPipe } from '../pipes/body-validator.pipe';
import { ParseIntPipe } from 'src/pipes/parse-int.pipe';
import { UpdateBookDto } from './model/update-book.dto';

class IParamId {
  id: string;
}

@UseInterceptors(ExceptionInterceptor)
@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  @UsePipes(new BodyValidatorPipe())
  async create(@Body() createBookDto: CreateBookDto) {
    await this.bookService.create(createBookDto);
  }

  @Get()
  async findAll(): Promise<BookDocument[]> {
    // throw new Error('test exc');
    return this.bookService.findAll();
  }

  @Get(':id')
  @UsePipes(ParseIntPipe)
  async getBook(@Param(':id') id: number): Promise<BookDocument> {
    return this.bookService.getBook(id);
  }

  @Put(':id')
  async updateBook(
    @Param() { id }: IParamId,
    @Body() body: UpdateBookDto,
  ): Promise<BookDocument> {
    return this.bookService.updateBook(id, body);
  }

  @Delete(':id')
  async deleteBook(@Param() { id }: IParamId): Promise<BookDocument> {
    return this.bookService.deleteBook(id);
  }
}
