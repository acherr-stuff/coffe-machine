import { Component, OnInit } from '@angular/core';
import {CoffeMachineService} from "../../services/coffe-machine.service";
import {FormBuilder} from "@angular/forms";
import {CFItem, Coin} from "../../models/coffe";

@Component({
  selector: 'app-coffe-machine',
  templateUrl: './coffe-machine.component.html',
  styleUrls: ['./coffe-machine.component.scss']
})
export class CoffeMachineComponent implements OnInit {

  public cfItems: CFItem[] = []
  selectedItem: CFItem;
  public cFWalletAmount: Coin[] = []
  public cFWalletSum: number = 0;
  public creditAmount: number;
  public subscribers = {}

  constructor(
      private coffeMachineService: CoffeMachineService,
      public fb: FormBuilder
  ) {
  }

  menuForm = this.fb.group({
    cFItemName: ['']
  });

  ngOnInit(): void {
    this.coffeMachineService.getCFItems().subscribe(val => {
      this.cfItems = val;
      this.selectedItem = this.cfItems[0]
    });

    this.coffeMachineService.getCFWalletAmount().subscribe(val => {
      this.cFWalletAmount = val;
      console.log("wallet cf data: ", this.cFWalletAmount);
      this.cFWalletSum = this.cFWalletAmount.reduce((acc: any, val) => {
        return acc + val.nominal*val.amount
      },0);
      console.log("wallet sum: ", this.cFWalletSum)
    });

    this.coffeMachineService.cFWalletAmount$.subscribe(val => {
      this.cFWalletAmount = val;
      this.cFWalletSum = this.cFWalletAmount.reduce((acc: any, val) => {
        return acc + val.nominal*val.amount
      },0);
      console.log("wallet sum: ", this.cFWalletSum)
    })

    this.coffeMachineService.getCreditAmount().subscribe(val => {

      this.creditAmount = val

    })

    this.coffeMachineService.creditAmount$.subscribe(val => {
      this.creditAmount = val;
      console.log("new credit amount: ", this.creditAmount)
    })


  }

  onSubmit() {
    if (this.selectedItem.amount > 0) {
      if (this.creditAmount > this.selectedItem.price) {
        this.coffeMachineService.buyItem(this.selectedItem.name, this.creditAmount).subscribe(val => {
          console.log("new cf items: ", val)
        });
        this.selectedItem.amount--;
        alert("Спасибо за покупку!")

      } else {
        alert("Недостаточно средств!")
      }
    } else {
      alert("Нет в наличии!")
    }

  }

  get cFItemName() {
    return this.menuForm.get('cFItemName');
  }

  changeItem(e: any) {
    console.log("selected item: ", this.selectedItem)
  }
}
