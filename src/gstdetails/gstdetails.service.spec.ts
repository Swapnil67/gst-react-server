import { Test, TestingModule } from '@nestjs/testing';
import { GstdetailsService } from './gstdetails.service';

describe('GstdetailsService', () => {
  let service: GstdetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GstdetailsService],
    }).compile();

    service = module.get<GstdetailsService>(GstdetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
