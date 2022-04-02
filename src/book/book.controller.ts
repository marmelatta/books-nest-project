import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookInterface } from './model/book.interface';
import { UpdateBookDto } from './model/create-book-dto.inteface';
import { BookDocument } from '../entities/book.entity';

class IParamId {
  id: string;
}

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  async create(@Body() createBookDto: BookInterface) {
    await this.bookService.create(createBookDto);
  }

  @Get()
  async findAll(): Promise<BookDocument[]> {
    return this.bookService.findAll();
  }

  @Get()
  async getBook(id: string): Promise<BookDocument> {
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
