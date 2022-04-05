import { Module } from '@nestjs/common';
import { BmiModule } from '../bmi';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [BmiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
