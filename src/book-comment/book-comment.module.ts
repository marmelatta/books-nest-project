import {Module} from '@nestjs/common';
import {BookCommentService} from './book-comment.service';
import {BookCommentGateway} from './gateway/book-comment.gateway';
import {ChatGateway} from "./gateway/chat.gateway";

@Module({
    providers: [BookCommentService, BookCommentGateway, ChatGateway]
})
export class BookCommentModule {
}
