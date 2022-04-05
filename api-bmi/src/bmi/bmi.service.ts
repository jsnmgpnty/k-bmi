import { Injectable } from '@nestjs/common';
import { BmiResponse } from './bmi.entity';
import { BmiStatus, BmiStatusWeightMap } from './bmi.enum';

@Injectable()
export class BmiService {
  /**
   * Computes BMI based on height and weight in metric form
   * @param height Height in centimeters
   * @param weight Weight in kilograms
   * @returns BMI value and category
   */
  computeBmi(height: number, weight: number): BmiResponse {
    const heightInMeters = height / 100;
    const result = +(weight / (heightInMeters * heightInMeters)).toFixed(2);
    return { bmi: result, status: this.getBmiStatus(result) };
  }

  /**
   * Gets BMI category based on value
   * @param value BMI value
   * @returns BMI category based on value
   */
  getBmiStatus(value: number): BmiStatus {
    const res = Object.keys(BmiStatusWeightMap).find(
      (key) => value < BmiStatusWeightMap[key],
    );
    return res as BmiStatus;
  }
}
