import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MinLength(3)
  @MaxLength(15)
  public readonly title: string;

  @IsString()
  @IsOptional()
  public readonly description: string;

  @IsString()
  @IsOptional()
  public readonly authors: string;

  @IsString()
  @IsOptional()
  public readonly favorite: string;

  @IsString()
  @IsOptional()
  public readonly fileCover: string;
}
