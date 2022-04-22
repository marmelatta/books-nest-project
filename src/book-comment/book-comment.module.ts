import { Module } from '@nestjs/common';
import { BookCommentService } from './book-comment.service';
import { BookCommentGateway } from './gateway/book-comment.gateway';
import { ChatGateway } from './gateway/chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BookComment,
  BookCommentSchema,
} from '../entities/book-comment.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BookComment.name,
        schema: BookCommentSchema,
      },
    ]),
  ],
  providers: [BookCommentService, BookCommentGateway, ChatGateway],
})
export class BookCommentModule {}
