import { HttpException, HttpStatus } from '@nestjs/common';
import { TransformFnParams } from 'class-transformer';
import { isObject } from 'class-validator';
import { HeightOptions, WeightOptions } from './bmi.enum';

/**
 * If height is passed in imperial form, convert it to metric
 * @param opts TransformFnParams
 * @returns Number
 */
export const heightTransform = (opts: TransformFnParams) => {
  if (!opts?.obj?.value) return null;
  if (opts.obj.unit === HeightOptions.FEET) {
    if (!isObject(opts.obj.value)) {
      throw new HttpException(
        'Invalid height input',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const { feet, inches } = opts.obj.value;
    const cmFeet = feet / 0.032808;
    const cmInches = inches / 0.3937;
    return cmFeet + cmInches;
  }
  return opts.obj.value;
};

/**
 * If weight is passed in imperial form, convert it to metric
 * @param opts TransformFnParams
 * @returns Number
 */
export const weightTransform = (opts: TransformFnParams) => {
  if (!opts?.obj?.value) return null;
  if (opts.obj.unit === WeightOptions.POUNDS) {
    return opts.obj.value / 2.2046;
  }
  return opts.obj.value;
};
