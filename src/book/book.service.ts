import { Injectable } from '@nestjs/common';
import { BookInterface } from './model/book.interface';
import { CreateBookDtoInteface } from './model/create-book-dto.inteface';

@Injectable()
export class BookService {
  private readonly books: BookInterface[] = [];

  create(book: BookInterface) {
    this.books.push(book);
  }

  findAll(): BookInterface[] {
    return this.books;
  }

  getBook(id: string): BookInterface {
    return this.books.find((x) => x.id === id);
  }

  updateBook(id: string, data: CreateBookDtoInteface) {
    const idx = this.books.findIndex((x) => x.id === id);
    if (idx !== -1) {
      this.books[idx] = {
        ...this.books[idx],
        ...data,
      };
      return this.books[idx];
    } else {
      return null;
    }
  }

  deleteBook(id: string): boolean {
    const idx = this.books.findIndex((x) => x.id === id);
    this.books.splice(idx, 1);
    return true;
  }
}
