import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, catchError, map, Observable} from "rxjs";
import {Coin} from "../models/coffe";


@Injectable({
  providedIn: 'root'
})
export class CoffeDataService {

  private walletAmount$= new BehaviorSubject<Coin[]>([])

  constructor(
      private http: HttpClient
  ) {
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
}
