import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorsRepository: Repository<Flavor>,
  ) {}

  async findAll(): Promise<Coffee[]> {
    return await this.coffeeRepository.find({ relations: ['flavors'] });
  }

  async findOne(id: string): Promise<Coffee> {
    const coffee = await this.coffeeRepository.findOne(id, {
      relations: ['flavors'],
    });
    if (!coffee) {
      //Nest Js way
      throw new NotFoundException(`Coffee # ${id} is not found`);
      //Http Way
      //throw new HttpException(`Coffee # ${id} is not found`,HttpStatus.NOT_FOUND);
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
    );
    const coffee: Coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });
    return await this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto): Promise<Coffee> {
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
      ));
    const existingCoffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
    });
    if (!existingCoffee) {
      throw new NotFoundException(`Coffee # ${id} is not found`);
    }
    return await this.coffeeRepository.save(existingCoffee);
  }

  async remove(id: string): Promise<Coffee> {
    const coffee = await this.coffeeRepository.findOne(id);
    return await this.coffeeRepository.remove(coffee);
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFalvor = await this.flavorsRepository.findOne({ name });
    if (existingFalvor) {
      return existingFalvor;
    }
    return this.flavorsRepository.create({ name });
  }
}
