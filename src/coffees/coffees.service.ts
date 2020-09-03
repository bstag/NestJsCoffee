import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  findAll(): Coffee[] {
    return this.coffees;
  }

  findOne(id: string): Coffee {
    const coffee = this.coffees.find(item => item.id === +id);
    if (!coffee) {
      //Nest Js way
      throw new NotFoundException(`Coffee # ${id} is not found`);
      //Http Way
      //throw new HttpException(`Coffee # ${id} is not found`,HttpStatus.NOT_FOUND);
    }
    return coffee;
  }

  create(createCoffeeDto:CreateCoffeeDto):CreateCoffeeDto {
    const id = this.coffees.length+1
    this.coffees.push({id,...createCoffeeDto});
    return createCoffeeDto;
  }

  update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      existingCoffee.brand = updateCoffeeDto.brand || existingCoffee.brand
      existingCoffee.name = updateCoffeeDto.name || existingCoffee.name
      existingCoffee.flavors = updateCoffeeDto.flavors || existingCoffee.flavors
      return existingCoffee
    } 
    throw new NotFoundException(`Coffee # ${id} is not found`);
  }

  remove(id: string): void {
    const coffeeIndex = this.coffees.findIndex(item => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
