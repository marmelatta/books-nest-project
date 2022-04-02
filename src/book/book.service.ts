import { Injectable } from '@nestjs/common';
import { BookInterface } from './model/book.interface';
import { UpdateBookDto } from './model/create-book-dto.inteface';
import { Book, BookDocument } from '../entities/book.entity';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private BookModel: Model<BookDocument>,
    @InjectConnection()
    private connection: Connection,
  ) {}

  create(data: BookInterface): Promise<BookDocument> {
    const book = new this.BookModel(data);
    return book.save();
  }

  findAll(): Promise<BookDocument[]> {
    return this.BookModel.find().exec();
  }

  getBook(id: string): Promise<BookDocument> {
    return this.BookModel.findById({ _id: id }).exec();
  }

  updateBook(id: string, data: UpdateBookDto): Promise<BookDocument> {
    return this.BookModel.findOneAndUpdate({ _id: id }, data).exec();
  }

  deleteBook(id: string): Promise<BookDocument> {
    return this.BookModel.findByIdAndDelete({ _id: id }).exec();
  }
}
