import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { BookService } from './book.service';
import { BookInterface } from './model/book.interface';
import { CreateBookDtoInteface } from './model/create-book-dto.inteface';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  async create(@Body() createBookDto: BookInterface) {
    this.bookService.create(createBookDto);
  }

  @Get()
  async findAll(): Promise<BookInterface[]> {
    return this.bookService.findAll();
  }

  @Get()
  async getBook(id: string): Promise<BookInterface> {
    return this.bookService.getBook(id);
  }

  @Put()
  async updateBook(book: BookInterface): Promise<BookInterface> {
    return this.bookService.updateBook(book.id, book);
  }

  @Delete()
  async deleteBook(id: string): Promise<boolean> {
    return this.bookService.deleteBook(id);
  }
}
