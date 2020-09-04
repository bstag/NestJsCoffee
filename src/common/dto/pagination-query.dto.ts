import { Type } from "@nestjs/common";
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  
  limit: number; 

  @IsOptional()
  @IsPositive()
  offset: number;
}
