export enum WeightOptions {
  KG = 'kg',
  POUNDS = 'lbs',
}

export enum HeightOptions {
  FEET = 'ft',
  CM = 'cm',
}

export enum BmiStatus {
  UNDERWEIGHT = 'underweight',
  NORMAL = 'normal',
  OVERWEIGHT = 'overweight',
  OBESE = 'obese',
}

export const BmiStatusWeightMap = {
  [BmiStatus.UNDERWEIGHT]: 18.5,
  [BmiStatus.NORMAL]: 25,
  [BmiStatus.OVERWEIGHT]: 30,
  [BmiStatus.OBESE]: 999,
};
