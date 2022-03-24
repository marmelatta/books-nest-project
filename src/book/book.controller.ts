import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { BookInterface } from './model/book.interface';
import { CreateBookDtoInteface } from './model/create-book-dto.inteface';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDtoInteface) {
    this.bookService.create(createBookDto);
  }

  @Get()
  async findAll(): Promise<BookInterface[]> {
    return this.bookService.findAll();
  }
}
