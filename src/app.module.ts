import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { HumansModule } from './humans/humans.module';
import { DogsModule } from './dogs/dogs.module';

@Module({
  imports: [CatsModule, DogsModule, HumansModule],
})
export class AppModule {}
