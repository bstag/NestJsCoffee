/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}
  @Get()
  findAll(@Query() paginationQuery): Coffee[]{
    // I set some defaults to pafe pull
    const { limit = 10, offset = 0 } = paginationQuery;
    return this.coffeesService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string): Coffee {
    return this.coffeesService.findOne(id)
  }
  @Post()
  create(@Body() body: unknown): unknown {
    return this.coffeesService.create(body)
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.coffeesService.update(id,body)
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id)
  }

  @Post('brew')
  @HttpCode(HttpStatus.GONE)
  dep(@Res() response) {
    //OverRides Httpcode from above with I am a teapot.
    response.status(418).send('I magicallly became a teapot');
  }
}
