import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import {
  BookComment,
  BookCommentDocument,
} from '../entities/book-comment.entity';
import { Connection, Model } from 'mongoose';

@Injectable()
export class BookCommentService {
  constructor(
    @InjectModel(BookComment.name)
    private BookCommentModel: Model<BookCommentDocument>,
    @InjectConnection()
    private connection: Connection,
  ) {}

  create(data): Promise<BookCommentDocument> {
    const bookComment = new this.BookCommentModel(data);
    return bookComment.save();
  }

  findAllBookComment(bookId: string): Promise<BookCommentDocument[]> {
    return this.BookCommentModel.find({ bookId }).exec();
  }
}
