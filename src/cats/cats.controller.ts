import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './entities/cat.entity';

@ApiBearerAuth()
@ApiTags('cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  /**
 * Create a new cat
 *
 * @remarks This operation allows you to create a new cat.
 *
 * @throws {500} Something went wrong.
 * @throws {400} Bad Request.
 */
  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Cat,
  })
  findOne(@Param('id') id: string): Cat {
    return this.catsService.findOne(+id);
  }
}
