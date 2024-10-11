import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationDTO {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Min(50)
  @Type(() => Number)
  readonly limit: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  readonly offset: number;
}
