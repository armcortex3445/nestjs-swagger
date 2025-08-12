import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/request/create-dog.dto';
import { UpdateDogDto } from './dto/request/update-dog.dto';
import { ApiBasicAuth, ApiBody, ApiCreatedResponse, ApiExtension, ApiExtraModels, ApiHeader, ApiOkResponse, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { Dog } from './entities/dog.entity';
import { PaginatedResponse } from '../common/dto/paginated.response';
import { resourceLimits } from 'worker_threads';
import { ApiPaginatedResponse } from '../common/decorator/swagger/apiPaginatedResponse';
import { ShowDogResponse } from './dto/response/showDog.response';
import { isEmpty } from 'class-validator';

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
  @ApiPaginatedResponse(ShowDogResponse)
  @Get()
  findAll() : PaginatedResponse<ShowDogResponse> {
    const data =  this.dogsService.findAll();

    return new PaginatedResponse(data.map(dog=>new ShowDogResponse(dog)));
  }

  
  @Get(':id')
  findOne(@Param('id') id: string) {
  const dog =  this.dogsService.findOne(+id);

  if(!dog){
    throw new BadRequestException();
  }

   return new ShowDogResponse(dog);
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
    const dog = this.dogsService.create(createDogDto);

    return new ShowDogResponse(dog);
  }

  @Put(':id')
  @ApiBody({type : [CreateDogDto]})
  update(@Param('id') id: string, @Body() updateDogDto: UpdateDogDto) {
    const target = this.dogsService.findOne(+id);
    if(target === undefined){
      throw new HttpException('no one',HttpStatus.BAD_REQUEST);
    }

    this.dogsService.update(target, updateDogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.dogsService.remove(+id);
  }
}
