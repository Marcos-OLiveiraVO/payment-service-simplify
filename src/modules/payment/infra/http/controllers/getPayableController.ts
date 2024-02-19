import { GetPayableUseCase } from 'src/modules/payment/application/use-cases/getPayableUseCase';
import { GetPayableDTO } from '../../adapters/dtos/getPayableDTO';
import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { PayableViewModel } from '../viewModels/payableViewModel';
import { ProfileClientViewModel } from 'src/modules/profileClient/infra/http/viewModels/profileClientViewModel';
import { ProfileClient } from 'src/modules/profileClient/application/entities/profileClient';

@Controller('payable')
export class GetPayableController {
  constructor(private getPayableUseCase: GetPayableUseCase) {}

  @Get('list')
  @HttpCode(200)
  async handle(@Query() data: GetPayableDTO) {
    const response = await this.getPayableUseCase.execute(data);

    const profile = response.payables[0]?.profileClient;
    const profileClientMapped = profile ? ProfileClientViewModel.toHttp(profile as ProfileClient) : undefined;

    const payableMapped = {
      profileClient: profileClientMapped,
      payables: response.payables.map(payable => PayableViewModel.toHttp(payable)),
      actualPage: response.actualPage,
      totalPages: response.totalPages,
      totalPayables: response.totalPayables,
    };

    return payableMapped;
  }
}
