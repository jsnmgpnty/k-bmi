import { Module } from '@nestjs/common';
import { BmiService } from './bmi.service';
import { BmiController } from './bmi.controller';

@Module({
  providers: [BmiService],
  controllers: [BmiController],
})
export class BmiModule {}
