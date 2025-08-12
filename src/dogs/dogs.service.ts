import { Injectable } from '@nestjs/common';
import { CreateDogDto } from './dto/request/create-dog.dto';
import { UpdateDogDto } from './dto/request/update-dog.dto';
import { Dog } from './entities/dog.entity';

@Injectable()
export class DogsService {
  private repo : Dog[] = [];

  create(createDogDto: CreateDogDto) {
    const { name , age , breed } = createDogDto;
    const newDog = new Dog( name,age, breed);
    this.repo.push(newDog);

    return newDog;
  }

  findAll() {
    const alls = [...this.repo];
    return alls;
  }

  findOne(id: number) {
    const target =  this.repo.find((dog,idx,arr) => dog.id === id);
    return target;
  }

  update(target : Dog, updateDogDto: UpdateDogDto) {
    const {name,age,breed } = updateDogDto;


    target.name = name;
    target.age = age;
    target.breed = breed; 

    return target;
  }

  remove(id: number) {
    return true;
  }
}
