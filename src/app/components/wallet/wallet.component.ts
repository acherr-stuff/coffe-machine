import { Component, OnInit } from '@angular/core';
import {Coin} from "../../models/coffe";
import {CoffeMachineService} from "../../services/coffe-machine.service";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  public walletAmount: Coin[] = []
  public walletSum: number = 0;

  constructor(
      private coffeMachineService: CoffeMachineService
  ) {}

  ngOnInit(): void {

    this.coffeMachineService.getWalletData();

    this.coffeMachineService.walletAmount$.subscribe(val => {
      this.walletAmount = val;
      this.walletSum = this.walletAmount.reduce((acc: any, val) => {
        return acc + val.nominal*val.amount
      },0);
    })
  }

  addCoin(nominal: number) {
    this.coffeMachineService.addCoinToMachine(nominal);
    this.walletSum = this.walletSum - nominal;
    this.coffeMachineService.creditAmount$.next(this.coffeMachineService.creditAmount$.getValue() + nominal)
  }

  getChange() {
    this.coffeMachineService.getChange(this.coffeMachineService.creditAmount$.getValue());
  }

}
