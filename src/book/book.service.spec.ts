import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { Book } from '../entities/book.entity';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

const mockBook = {
  title: 'title 1',
  description: 'description 1',
  authors: 'Author 1',
  favorite: 'Favorite 1',
  fileCover: 'FileCover 1',
};

describe('BookService', () => {
  let service: BookService;
  let model: Model<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getModelToken('Book'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockBook),
            constructor: jest.fn().mockResolvedValue(mockBook),
            find: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    model = module.get<Model<Book>>(getModelToken('Book'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should insert a new book', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        title: 'title 1',
        description: 'description 1',
        authors: 'Author 1',
        favorite: 'Favorite 1',
        fileCover: 'FileCover 1',
      }),
    );

    const newBook = await service.create({
      title: 'title 1',
      description: 'description 1',
      authors: 'Author 1',
      favorite: 'Favorite 1',
      fileCover: 'FileCover 1',
    });
    expect(newBook).toEqual(mockBook);
  });
});
