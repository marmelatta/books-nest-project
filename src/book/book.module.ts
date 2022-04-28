import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from '../entities/book.entity';
import { BookFirebaseService } from './book-firebase/book-firebase.service';
import { firestore } from 'firebase-admin';
import Firestore = firestore.Firestore;

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Book.name,
        schema: BookSchema,
      },
    ]),
  ],
  providers: [BookService, BookFirebaseService, Firestore],
  controllers: [BookController],
})
export class BookModule {}
