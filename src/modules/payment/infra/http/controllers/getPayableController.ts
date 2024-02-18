import { GetPayableUseCase } from 'src/modules/payment/application/use-cases/getPayableUseCase';
import { GetPayableDTO } from '../../adapters/dtos/getPayableDTO';
import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { PayableViewModel } from '../viewModels/payableViewModel';
import { Payable } from 'src/modules/payment/application/entities/payable';

@Controller('payable')
export class GetPayableController {
  constructor(private getPayableUseCase: GetPayableUseCase) {}

  @Get('list')
  @HttpCode(200)
  async handle(@Query() data: GetPayableDTO) {
    const response = await this.getPayableUseCase.execute(data);

    const payableMapped = {
      profileClient: response.payables[0].profileClient,
      payables: response.payables.map(payable => PayableViewModel.toHttp(payable)),
      actualPage: response.actualPage,
      totalPages: response.totalPages,
      totalPayables: response.totalPayables,
    };

    return payableMapped;
  }
}
