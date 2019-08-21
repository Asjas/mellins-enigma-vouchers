import { Test, TestingModule } from '@nestjs/testing';
import { VoucherController } from './voucher.controller';
import { VoucherService } from './voucher.service';

describe('Voucher Controller', () => {
  let controller: VoucherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VoucherService],
      controllers: [VoucherController],
    }).compile();

    controller = module.get<VoucherController>(VoucherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
