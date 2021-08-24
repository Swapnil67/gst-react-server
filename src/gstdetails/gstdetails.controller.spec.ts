import { Test, TestingModule } from '@nestjs/testing';
import { GstdetailsController } from './gstdetails.controller';
import { GstdetailsService } from './gstdetails.service';

describe('GstdetailsController', () => {
  let controller: GstdetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GstdetailsController],
      providers: [GstdetailsService],
    }).compile();

    controller = module.get<GstdetailsController>(GstdetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
