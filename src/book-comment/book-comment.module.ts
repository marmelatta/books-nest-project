import { Inject, Module } from "@nestjs/common";
import { BookCommentGateway } from './gateway/book-comment.gateway';
import { ChatGateway } from './gateway/chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BookComment,
  BookCommentSchema,
} from '../entities/book-comment.entity';
import { BookCommentService } from './book-comment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BookComment.name,
        schema: BookCommentSchema,
      },
    ]),
  ],
  providers: [
    BookCommentService,
    BookCommentGateway,
    ChatGateway,
  ],
})
export class BookCommentModule {}
