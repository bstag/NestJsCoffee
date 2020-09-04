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
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}
  @Get()
  findAll(@Query() paginationQuery:PaginationQueryDto): Promise<Coffee[]>{
    
    return this.coffeesService.findAll(paginationQuery);
  }
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Coffee> {
    return this.coffeesService.findOne(id)
  }
  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    return this.coffeesService.create(createCoffeeDto)
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto):Promise<Coffee> {
    return this.coffeesService.update(id,updateCoffeeDto)
  }
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Coffee> {
    return this.coffeesService.remove(id)
  }

  @Post('brew')
  @HttpCode(HttpStatus.GONE)
  dep(@Res() response) {
    //OverRides Httpcode from above with I am a teapot.
    response.status(418).send('I magicallly became a teapot');
  }
}
