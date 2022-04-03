import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Book } from '../entities/book.entity';
import { platform } from 'os';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class BodyValidatorPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      //проверяем что есть какие-то правила и данные валидны
      return value;
    }

    const object = plainToClass(metatype, value); // сливаем метаданные с значениями которые были из вне
    //получаем класс дто

    const errors = await validate(object);

    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }

    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Number];
    return !types.includes(metatype);
  }
}
