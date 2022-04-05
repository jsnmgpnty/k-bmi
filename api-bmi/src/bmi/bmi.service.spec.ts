import { Test, TestingModule } from '@nestjs/testing';
import { BmiService } from './bmi.service';

describe('BmiService', () => {
  let service: BmiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BmiService],
    }).compile();

    service = module.get<BmiService>(BmiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
