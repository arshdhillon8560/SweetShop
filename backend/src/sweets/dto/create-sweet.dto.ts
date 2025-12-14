import { IsString, IsNumber, Min, IsOptional, IsUrl } from 'class-validator';

export class CreateSweetDto {
  @IsString()
  name: string;

  @IsString()
  category: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}

