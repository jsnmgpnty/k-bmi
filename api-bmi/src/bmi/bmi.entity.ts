import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { BmiStatus, HeightOptions, WeightOptions } from './bmi.enum';
import { heightTransform, weightTransform } from './utils';

const BmiErrorMessages = {
  INVALID_WEIGHT: 'Invalid weight input',
  INVALID_WEIGHT_UNIT: 'Invalid weight unit. Please use kg or lbs only.',
  INVALID_HEIGHT: 'Invalid height input',
  INVALID_HEIGHT_UNIT: 'Invalid height unit. Please use cm or feet only.',
};

export class BmiResponse {
  @ApiProperty()
  bmi: number;

  @ApiProperty()
  status: BmiStatus;
}

export class WeightInput {
  @ApiProperty()
  @IsNotEmpty({ context: { message: BmiErrorMessages.INVALID_WEIGHT } })
  @IsNumber({}, { context: { message: BmiErrorMessages.INVALID_WEIGHT } })
  @Transform(weightTransform)
  value: number;

  @ApiProperty()
  @IsEnum(WeightOptions, {
    context: { message: BmiErrorMessages.INVALID_WEIGHT_UNIT },
  })
  unit: WeightOptions;
}

export class HeightImperial {
  @ApiProperty()
  @IsNotEmpty({ context: { message: BmiErrorMessages.INVALID_HEIGHT } })
  @IsNumber({}, { context: { message: BmiErrorMessages.INVALID_HEIGHT } })
  feet: number;

  @ApiProperty()
  @IsNotEmpty({ context: { message: BmiErrorMessages.INVALID_HEIGHT } })
  @IsNumber({}, { context: { message: BmiErrorMessages.INVALID_HEIGHT } })
  inches: number;
}

export class HeightInput {
  @ApiProperty()
  @IsNotEmpty({ context: { message: BmiErrorMessages.INVALID_HEIGHT } })
  @IsNumber({}, { context: { message: BmiErrorMessages.INVALID_HEIGHT } })
  @Type(() => HeightImperial)
  @Transform(heightTransform)
  value: number | HeightImperial;

  @ApiProperty()
  @IsEnum(HeightOptions, {
    context: { message: BmiErrorMessages.INVALID_HEIGHT_UNIT },
  })
  unit: HeightOptions;
}

export class CalculateBmiRequest {
  @ApiProperty()
  @Type(() => HeightInput)
  @ValidateNested()
  @IsDefined({ context: { message: BmiErrorMessages.INVALID_HEIGHT } })
  height: HeightInput;

  @ApiProperty()
  @Type(() => WeightInput)
  @ValidateNested()
  @IsDefined({ context: { message: BmiErrorMessages.INVALID_WEIGHT } })
  weight: WeightInput;
}
