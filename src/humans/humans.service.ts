import { Injectable } from '@nestjs/common';
import { CreateHumanDto } from './dto/create-human.dto';
import { UpdateHumanDto } from './dto/update-human.dto';

@Injectable()
export class HumansService {
  create(createHumanDto: CreateHumanDto) {
    return 'This action adds a new human';
  }

  findAll() {
    return `This action returns all humans`;
  }

  findOne(id: number) {
    return `This action returns a #${id} human`;
  }

  update(id: number, updateHumanDto: UpdateHumanDto) {
    return `This action updates a #${id} human`;
  }

  remove(id: number) {
    return `This action removes a #${id} human`;
  }
}
