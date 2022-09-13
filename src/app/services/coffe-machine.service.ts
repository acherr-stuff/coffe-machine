import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable, Subject} from "rxjs";
import {CFItem, Coin} from "../models/coffe";
import {appConfig} from "../config";

@Injectable({
  providedIn: 'root'
})
export class CoffeMachineService {

    public cFWalletAmount$= new BehaviorSubject<Coin[]>([])
    public walletAmount$= new BehaviorSubject<Coin[]>([])
    public creditAmount: number = 0;
    public creditAmount$ = new BehaviorSubject<number>(0)

  constructor(
      private http: HttpClient
  ) { }


  getCFItems(): Observable<any> {
    return this.http.get(`${appConfig.host}/items`)
  }

    getWalletData(): void {
        this.http.get(`${appConfig.host}/wallet`).pipe(
            map((data: any) => {
                const walletAmount = data;
                this.walletAmount$.next(walletAmount);
                return walletAmount
            }),
            catchError((err, caught) => caught)
        ).subscribe()
    }

    getCFWalletAmount(): void {
        this.http.get(`${appConfig.host}/cf-wallet`).pipe(
            map((data: any) => {
                const cFWalletAmount = data;
                this.cFWalletAmount$.next(cFWalletAmount);
                return cFWalletAmount
            }),
            catchError((err, caught) => caught)
        ).subscribe()
    }

    getCreditAmount(): void {
        this.http.get(`${appConfig.host}/credit`).pipe(
            map((data: any) => {
                const creditAmount = data;
                this.creditAmount$.next(creditAmount);
                return creditAmount
            }),
            catchError((err, caught) => caught)
        ).subscribe()
    }


    addCoinToMachine(nominal) {
      return this.http.post(`${appConfig.host}/add-coin`, {nominal: nominal} ).pipe(
          map((data: any)=> {
              const newWalletAmount = data.walletAmount;
              this.walletAmount$.next(newWalletAmount);
              const newCFAmount = data.cfWalletAmount;
              this.cFWalletAmount$.next(newCFAmount);
          }),
          catchError((err, caught) => caught),
      ).subscribe()
  }

  buyItem(name: string, moneyAmount: number) {
      return this.http.post(`${appConfig.host}/buy`, {name: name, moneyAmount: moneyAmount} ).pipe(
          map((data: any)=> {
              this.creditAmount$.next(data)
          }),
          catchError((err, caught) => caught)
      )
  }

  getChange(moneyAmount: number) {

       this.http.post(`${appConfig.host}/get-change`, {moneyAmount: moneyAmount} ).pipe(
          map((data: any)=> {
              this.creditAmount$.next(data.creditAmount);

              this.cFWalletAmount$.next(data.cFWalletAmount);
              this.walletAmount$.next(data.walletAmount);
          }),
          catchError((err, caught) => caught)
      ).subscribe()
  }

}
