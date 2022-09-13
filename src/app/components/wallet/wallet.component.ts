import { Component, OnInit } from '@angular/core';
import {CoffeDataService} from "../../services/coffe-data.service";
import {BehaviorSubject, Observable, reduce} from "rxjs";
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
  //public walletSum: Observable<number> = new Observable<number>();

  constructor(
      private coffeMachineService: CoffeMachineService
  ) {}

  ngOnInit(): void {
    this.coffeMachineService.getWalletData2().subscribe(val => {
      this.walletAmount = val;
      console.log("wallet data: ", this.walletAmount);
      this.walletSum = this.walletAmount.reduce((acc: any, val) => {
       return acc + val.nominal*val.amount
      },0);
      console.log("wallet sum: ", this.walletSum)
    });

    this.coffeMachineService.walletAmount$.subscribe(val => {
      this.walletAmount = val;
      this.walletSum = this.walletAmount.reduce((acc: any, val) => {
        return acc + val.nominal*val.amount
      },0);
      console.log("wallet sum: ", this.walletSum)
    })
  }

  ngDoCheck() {

  }

  addCoin(nominal: number) {
   // console.log("coin added to credit: ", nominal)

    this.coffeMachineService.addCoinToMachine(nominal).subscribe(val => {
      this.walletAmount = val;
      this.coffeMachineService.getCreditAmount().subscribe(val => {
        console.log(" credit credit: ", val)
          }
      )
      this.walletSum = this.walletSum - nominal
     // this.coffeMachineService.creditAmount += nominal;
      //this.coffeMachineService.creditAmount$.next()
      console.log("front new wallet amount: ", val)
    })
  }

  getChange() {
    this.coffeMachineService.getChange(this.coffeMachineService.creditAmount$.getValue()).subscribe();
  }

}
