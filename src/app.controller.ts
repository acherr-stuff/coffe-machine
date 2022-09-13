import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { MockRepository } from './service/mock.repostory';
import { CFItem, Coin } from './model/coffe';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private mockRepository: MockRepository,
  ) {}

  @Get()
  getHello(): string {
    // console.log("wallet sum: ", this.mockRepository.calculateWalletSum())
    return this.appService.getHello();
  }

  @Get('wallet')
  getWalletAmount(): Coin[] {
    return this.mockRepository.getWalletAmount();
  }

  @Get('cf-wallet')
  getCFWalletAmount(): Coin[] {
    return this.mockRepository.getCFWalletAmount();
  }

  @Get('credit')
  getCreditAmount(): number {
    return this.mockRepository.getCreditAmount();
  }

  @Get('items')
  getCFItems(): CFItem[] {
    return this.mockRepository.getCFItems();
  }

  @Post('add-coin')
  addCoinToWallet(@Body() data: { nominal: number }): object {
    return this.mockRepository.addCoinToMachine(data.nominal);
  }

  @Post('buy')
  buyItem(@Body() data: { name: string; moneyAmount: number }): any {
    return this.mockRepository.buyItem(data.name, data.moneyAmount);
  }

  @Post('get-change')
  getChange(@Body() data: { moneyAmount: number }): object {
    return this.mockRepository.getChange(data.moneyAmount);
  }
}
