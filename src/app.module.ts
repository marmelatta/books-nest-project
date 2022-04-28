import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BookCommentModule } from './book-comment/book-comment.module';
import { AlertGateway } from './alert/alert.gateway';
import { AlertController } from './alert/alert.controller';
import { FirebaseModule } from 'nestjs-firebase';

@Module({
  imports: [
    BookModule,
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: 'example',
      user: 'admin',
      pass: 'password',
    }),
    HttpModule,
    UsersModule,
    AuthModule,
    BookCommentModule,
    FirebaseModule.forRoot({
      googleApplicationCredential: './../static/serviceAccountKey.json',
    }),
  ],
  controllers: [AppController, UsersController, AlertController],
  providers: [AppService, AlertGateway],
})
export class AppModule {}
