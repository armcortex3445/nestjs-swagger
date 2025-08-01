import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpException, HttpStatus } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/request/create-dog.dto';
import { UpdateDogDto } from './dto/request/update-dog.dto';
import { ApiBasicAuth, ApiBody, ApiCreatedResponse, ApiExtension, ApiExtraModels, ApiHeader, ApiOkResponse, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { FindDogResponse } from './dto/request/find-dog.response';
import { Dog } from './entities/dog.entity';
import { PaginatedResponse } from '../common/dto/paginated.response';
import { resourceLimits } from 'worker_threads';
import { ApiPaginatedResponse } from '../common/decorator/swagger/apiPaginatedResponse';

@ApiBasicAuth()
@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  /**
 * find all dog
 *
 * @remarks this operation find all dogs
 *
 * @throws {500} Something went wrong.
 * @throws {400} Bad Request.
 */
  @ApiExtension('x-foo', { hello: 'world' })
  @ApiPaginatedResponse(Dog)
  @Get()
  findAll() : PaginatedResponse<Dog> {
    const data =  this.dogsService.findAll();

    return {
      total : data.length,
      offset : 0,
      limit : 0, 
      data,
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dogsService.findOne(+id);
  }

  @ApiHeader({
    name : 'X-custom',
    description : 'Custom header'
  })
  @ApiTags('tag')
  @ApiResponse({ status: HttpStatus.AMBIGUOUS, description : 'request is ambiguous'})
  @ApiCreatedResponse({ description : 'create dog'})
  @Post()
  create(@Body() createDogDto: CreateDogDto) {
    return this.dogsService.create(createDogDto);
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
