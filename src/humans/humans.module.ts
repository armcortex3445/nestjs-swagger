import { Module } from '@nestjs/common';
import { HumansService } from './humans.service';
import { HumansController } from './humans.controller';

@Module({
  controllers: [HumansController],
  providers: [HumansService],
})
export class HumansModule {}
