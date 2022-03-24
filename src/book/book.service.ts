import { Injectable } from '@nestjs/common';
import { BookInterface } from './model/book.interface';

@Injectable()
export class BookService {
  private readonly books: BookInterface[] = [];

  create(book: BookInterface) {
    this.books.push(book);
  }

  findAll(): BookInterface[] {
    return this.books;
  }
}
