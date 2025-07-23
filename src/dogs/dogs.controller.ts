import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpException, HttpStatus } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { ApiBody } from '@nestjs/swagger';
import { FindDogResponse } from './dto/find-dog.response';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Post()
  create(@Body() createDogDto: CreateDogDto) {
    return this.dogsService.create(createDogDto);
  }

  @Get()
  findAll() : FindDogResponse {
    const data =  this.dogsService.findAll();

    return {
      count : data.length,
      data,
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dogsService.findOne(+id);
  }

  @Put(':id')
  @ApiBody({type : [CreateDogDto]})
  update(@Param('id') id: string, @Body() updateDogDto: UpdateDogDto) {
    const target = this.findOne(id);
    if(target === undefined){
      throw new HttpException('no one',HttpStatus.BAD_REQUEST);
    }

    return this.dogsService.update(target, updateDogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dogsService.remove(+id);
  }
}
