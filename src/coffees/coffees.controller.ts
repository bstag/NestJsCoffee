import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll(): string {
    return 'allcoffes';
  }
  @Get(':id')
  findOne(@Param('id') id: string | number | null): string {
    return `thisd is the ${id} `;
  }
  @Post()
  create(@Body() body: unknown): unknown {
    return body;
  }
}
