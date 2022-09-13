import { Injectable } from '@nestjs/common';
import { CFItem, Coin } from '../model/coffe';

@Injectable()
export class MockRepository {
  private walletAmount: Coin[];
  private cfItems: CFItem[];
  private cfWalletAmount: Coin[];
  private creditAmount: number;
  private walletSum: number;

  constructor() {
    this.creditAmount = 0;
    this.walletSum = 0;
    this.walletAmount = [
      {
        id: '1',
        nominal: 1,
        amount: 10,
      },
      {
        id: '2',
        nominal: 2,
        amount: 30,
      },
      {
        id: '3',
        nominal: 5,
        amount: 20,
      },
      {
        id: '4',
        nominal: 10,
        amount: 15,
      },
    ];

    this.cfItems = [
      {
        id: '1',
        name: 'Чай',
        amount: 10,
        price: 13,
      },
      {
        id: '2',
        name: 'Кофе',
        amount: 20,
        price: 18,
      },
      {
        id: '3',
        name: 'Кофе с молоком',
        amount: 20,
        price: 21,
      },
      {
        id: '4',
        name: 'Сок',
        amount: 15,
        price: 35,
      },
    ];

    this.cfWalletAmount = [
      {
        id: '1',
        nominal: 1,
        amount: 100,
      },
      {
        id: '2',
        nominal: 2,
        amount: 100,
      },
      {
        id: '3',
        nominal: 5,
        amount: 100,
      },
      {
        id: '4',
        nominal: 10,
        amount: 100,
      },
    ];
  }

  getWalletAmount(): Coin[] {
    return this.walletAmount;
  }

  getCFItems(): CFItem[] {
    return this.cfItems;
  }

  getCFWalletAmount(): Coin[] {
    return this.cfWalletAmount;
  }

  addCoinToMachine(nominal: number): object {
    this.walletAmount.find((el) => el.nominal === nominal).amount--;
    this.cfWalletAmount.find((el) => el.nominal === nominal).amount++;
    this.creditAmount += nominal;
    return {
      walletAmount: this.walletAmount,
      cfWalletAmount: this.cfWalletAmount,
    };
  }

  getCreditAmount() {
    return this.creditAmount;
  }

  buyItem(name: string, moneyAmount: number): number {
    this.cfItems.find((el) => el.name === name).amount--;
    const amount =
      moneyAmount - this.cfItems.find((el) => el.name === name).price;
    this.creditAmount = amount;
    return amount;
  }

  getChange(moneyAmount: number) {
    let change = moneyAmount;
    const nominals = this.cfWalletAmount.slice(0);
    nominals.reverse();
    for (let i = 0; i < nominals.length; i++) {
      if (change >= nominals[i].nominal && nominals[i].amount > 0) {
        const temp = Math.floor(change / nominals[i].nominal);
        change = change % nominals[i].nominal;
        this.walletAmount.find(
          (el) => el.nominal === nominals[i].nominal,
        ).amount += temp;
        this.cfWalletAmount.find(
          (el) => el.nominal === nominals[i].nominal,
        ).amount -= temp;

        this.creditAmount -= temp * nominals[i].nominal;
      }
    }
    return {
      walletAmount: this.walletAmount,
      cFWalletAmount: this.cfWalletAmount,
      creditAmount: this.creditAmount,
    };
  }
}
