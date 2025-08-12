import { Module } from '@nestjs/common';
import { HumansService } from './humans.service';
import { HumansController } from './humans.controller';
import { DogsModule } from '../dogs/dogs.module';
import { CatsModule } from '../cats/cats.module';

@Module({
  imports : [DogsModule,CatsModule],
  controllers: [HumansController],
  providers: [HumansService],
})
export class HumansModule {}
