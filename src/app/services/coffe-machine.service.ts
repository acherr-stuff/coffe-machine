import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable, Subject} from "rxjs";
import {CFItem, Coin} from "../models/coffe";

@Injectable({
  providedIn: 'root'
})
export class CoffeMachineService {

 // private cfItems$= new BehaviorSubject<CFItem[]>([])
    public cFWalletAmount$= new BehaviorSubject<Coin[]>([])
    public walletAmount$= new BehaviorSubject<Coin[]>([])
  public creditAmount: number = 0;
  public creditAmount$ = new BehaviorSubject<number>(0)
    public cFItems$ = new BehaviorSubject<CFItem[]>([])

  constructor(
      private http: HttpClient
  ) { }

    ngOnInit() {

    }

  getCFItems(): Observable<any> {
    return this.http.get('http://localhost:3000/items')
  }


  getWalletData(): Observable<any> {
    return this.http.get('http://localhost:3000/wallet')
  }

  getWalletData2(): Observable<any> {
    return this.http.get('http://localhost:3000/wallet').pipe(
        map((data: any) => {
          const walletAmount = data;
          this.walletAmount$.next(walletAmount);
          return walletAmount
        }),
        catchError((err, caught) => caught)
    )
  }


  getCFWalletAmount() {
    return this.http.get('http://localhost:3000/cf-wallet').pipe(
        map((data: any) => {
          const cFWalletAmount = data;
          this.cFWalletAmount$.next(cFWalletAmount);
          return cFWalletAmount
        }),
        catchError((err, caught) => caught)
    )
  }

    getCreditAmount() {
        return this.http.get('http://localhost:3000/credit').pipe(
            map((data: any) => {
                const creditAmount = data;
                console.log("get credit Amount")
                this.creditAmount$.next(creditAmount);
                return creditAmount
            }),
            catchError((err, caught) => caught)
        )
    }

  addCoinToMachine(nominal) {
      return this.http.post('http://localhost:3000/add-coin', {nominal: nominal} ).pipe(
          map((data: any)=> {
              // const oldCredit = this.creditAmount$.getValue();
              // this.creditAmount$.next(oldCredit + nominal)
              // console.log("new credit amount: ", this.creditAmount$.getValue())
              const newWalletAmount = data.walletAmount;
              this.walletAmount$.next(newWalletAmount);
              const newCFAmount = data.cfWalletAmount;
              this.cFWalletAmount$.next(newCFAmount);
              return newWalletAmount
          }),
          catchError((err, caught) => caught)
      )
  }

  buyItem(name: string, moneyAmount: number) {
      return this.http.post('http://localhost:3000/buy', {name: name, moneyAmount: moneyAmount} ).pipe(
          map((data: any)=> {
              this.creditAmount$.next(data)
              // const newCFItems = data;
              // this.cFItems$.next(newCFItems);
              // return newCFItems
          }),
          catchError((err, caught) => caught)
      )
  }

  getChange(moneyAmount: number) {
      // let coinsAmount = [];
      // let change = moneyAmount;
      // const nominals = [10,5,2,1];
      // for (let i=0; i<nominals.length; i++) {
      //     if (change>nominals[i]) {
      //         //change = change - nominals[i]
      //        let temp = Math.floor(change/nominals[i])
      //         change = change % nominals[i];
      //
      //         coinsAmount.push(temp);
      //         console.log(`new coins amount: ${nominals[i]} `, coinsAmount)
      //     }
      // }
      //
      // return coinsAmount;
      //console.log(" get change : ", moneyAmount);
      return this.http.post('http://localhost:3000/get-change', {moneyAmount: moneyAmount} ).pipe(
          map((data: any)=> {
              const newCreditAmount = data.creditAmount
              this.creditAmount$.next(newCreditAmount);

              this.cFWalletAmount$.next(data.cFWalletAmount);
              this.walletAmount$.next(data.walletAmount);
              // const newCFItems = data;
              // this.cFItems$.next(newCFItems);
              return newCreditAmount
          }),
          catchError((err, caught) => caught)
      )
  }

}
