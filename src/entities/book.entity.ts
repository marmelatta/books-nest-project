import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  authors: string;

  @Prop()
  favorite: string;

  @Prop()
  fileCover: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
