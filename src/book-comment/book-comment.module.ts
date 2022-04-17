import { Module } from '@nestjs/common';
import { BookCommentService } from './book-comment.service';
import { BookCommentGateway } from './gateway/book-comment.gateway';

@Module({
  providers: [BookCommentService, BookCommentGateway]
})
export class BookCommentModule {}
