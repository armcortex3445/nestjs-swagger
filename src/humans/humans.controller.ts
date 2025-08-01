import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HumansService } from './humans.service';
import { CreateHumanDto } from './dto/request/create-human.dto';
import { UpdateHumanDto } from './dto/request/update-human.dto';

@Controller('humans')
export class HumansController {
  constructor(private readonly humansService: HumansService) {}

  @Post()
  create(@Body() createHumanDto: CreateHumanDto) {
    return this.humansService.create(createHumanDto);
  }

  @Get()
  findAll() {
    return this.humansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.humansService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHumanDto: UpdateHumanDto) {
    return this.humansService.update(+id, updateHumanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.humansService.remove(+id);
  }
}
