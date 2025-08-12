import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/request/create-cat.dto';
import { Cat } from './entities/cat.entity';
import { catchError } from 'rxjs';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(dto: CreateCatDto): Cat {
    const {name,age,breed} = dto;
    const cat = new Cat(name,age,breed);
    this.cats.push(cat);
    return cat;
  }

  findOne(id: number): Cat | undefined {
    return this.cats.find(cat=> cat.id === id);
  }
}
