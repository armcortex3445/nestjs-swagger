import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HumansService } from './humans.service';
import { CreateHumanDto } from './dto/request/create-human.dto';
import { UpdateHumanDto } from './dto/request/update-human.dto';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { ShowHumanResponse } from './dto/response/showHuman.response';
import { PaginatedResponse } from '../common/dto/paginated.response';
import { ApiPaginatedResponse } from '../common/decorator/swagger/apiPaginatedResponse';


@Controller('humans')
export class HumansController {
  constructor(private readonly humansService: HumansService) {}

  @Post()
  create(@Body() createHumanDto: CreateHumanDto) {
    const human = this.humansService.create(createHumanDto);

    return new ShowHumanResponse(human);
  }

  @ApiPaginatedResponse(ShowHumanResponse)
  @Get()
  findAll() {
    return this.humansService.findAll();
  }

  @ApiResponse({ type : ShowHumanResponse})
  @Get(':id')
  findOne(@Param('id') id: string) {
    this.humansService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHumanDto: UpdateHumanDto) {
    this.humansService.update(+id, updateHumanDto);

  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.humansService.remove(+id);
  }
}
