import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './model/create-book.dto';
import { Book, BookDocument } from '../entities/book.entity';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { UpdateBookDto } from "./model/update-book.dto";

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private BookModel: Model<BookDocument>,
    @InjectConnection()
    private connection: Connection,
  ) {}

  create(data: CreateBookDto): Promise<BookDocument> {
    const book = new this.BookModel(data);
    return book.save();
  }

  findAll(): Promise<BookDocument[]> {
    return this.BookModel.find().exec();
  }

  getBook(id: number): Promise<BookDocument> {
    return this.BookModel.findById({ _id: id }).exec();
  }

  updateBook(id: string, data: UpdateBookDto): Promise<BookDocument> {
    return this.BookModel.findOneAndUpdate({ _id: id }, data).exec();
  }

  deleteBook(id: string): Promise<BookDocument> {
    return this.BookModel.findByIdAndDelete({ _id: id }).exec();
  }
}
