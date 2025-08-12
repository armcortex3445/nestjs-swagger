import { Inject, Injectable } from '@nestjs/common';
import { CreateHumanDto } from './dto/request/create-human.dto';
import { UpdateHumanDto } from './dto/request/update-human.dto';
import { Human } from './entities/human.entity';
import { CreateCatDto } from '../cats/dto/request/create-cat.dto';
import { Cat } from '../cats/entities/cat.entity';
import { CatsService } from '../cats/cats.service';
import { DogsService } from '../dogs/dogs.service';

@Injectable()
export class HumansService {
  readonly humans : Human[] = [];

  constructor(@Inject(CatsService) private catService : CatsService, @Inject(DogsService) private dogsService : DogsService) {

  }

  create(dto: CreateHumanDto) {
    const {name,age,pets} = dto;
    const petEntities = pets.map(pet=> pet instanceof CreateCatDto ? this.catService.create(pet) : this.dogsService.create(pet));
    const human = new Human(name,age,petEntities)
    this.humans.push(human);

  return human;
    
  }

  findAll() {
    return this.humans;
  }

  findOne(id: number) {
    return this.humans.find(h=>h.id === id);
  }

  update(id: number, updateHumanDto: UpdateHumanDto) {
    return `This action updates a #${id} human`;
  }

  remove(id: number) {
    return `This action removes a #${id} human`;
  }
}
