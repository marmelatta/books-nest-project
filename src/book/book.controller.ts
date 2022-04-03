import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, UseInterceptors, UsePipes
} from "@nestjs/common";
import { BookService } from './book.service';
import { BookInterface } from './model/book.interface';
import { UpdateBookDto } from './model/create-book-dto.inteface';
import { BookDocument } from '../entities/book.entity';
import { ExceptionInterceptor } from "../other/exception.interceptor";
import { BodyValidatorPipe } from "../other/body-validator.pipe";
import { ParseIntPipe } from "src/other/parse-int.pipe";

class IParamId {
  id: string;
}

@UseInterceptors(ExceptionInterceptor)
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
