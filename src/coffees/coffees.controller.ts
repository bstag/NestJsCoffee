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
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll(): string {
    return 'allcoffes';
  }
  @Get(':id')
  findOne(@Param('id') id: string | number | null): string {
    return `this is the id ${id} `;
  }
  @Post()
  create(@Body() body: unknown): unknown {
    return body;
  }
 
  @Post('brew')
  @HttpCode(HttpStatus.GONE)
  dep(@Res() response) {
    //OverRides Httpcode from above with I am a teapot.
    response.status(418).send('I magicallly became a teapot')
  }
}
