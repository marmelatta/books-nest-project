import { Test, TestingModule } from '@nestjs/testing';
import { BookFirebaseService } from './book-firebase.service';

describe('BookFirebaseService', () => {
  let service: BookFirebaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookFirebaseService],
    }).compile();

    service = module.get<BookFirebaseService>(BookFirebaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
