import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { isNumber } from 'class-validator';
import { BmiResponse, CalculateBmiRequest } from './bmi.entity';
import { BmiService } from './bmi.service';
import { throwValidationErrors } from './validation-errors.helper';

@Controller('bmi')
export class BmiController {
  constructor(private svc: BmiService) {}

  @Post()
  @ApiOperation({ operationId: 'computeBmi' })
  @ApiResponse({ type: BmiResponse, status: 200 })
  @UsePipes(
    new ValidationPipe({
      exceptionFactory: throwValidationErrors,
      transform: true,
    }),
  )
  computeBmi(@Body() req: CalculateBmiRequest): BmiResponse {
    if (!isNumber(req.height.value)) {
      throw new HttpException(
        'Invalid height input',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return this.svc.computeBmi(req.height.value as number, req.weight.value);
  }
}
