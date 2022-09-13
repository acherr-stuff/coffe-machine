import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WalletComponent } from './components/wallet/wallet.component';
import {CoffeDataService} from "./services/coffe-data.service";
import {HttpClientModule} from "@angular/common/http";
import { WalletCfComponent } from './components/wallet-cf/wallet-cf.component';
import { CoffeMachineComponent } from './components/coffe-machine/coffe-machine.component';
import {CoffeMachineService} from "./services/coffe-machine.service";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    WalletComponent,
    WalletCfComponent,
    CoffeMachineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [CoffeDataService, CoffeMachineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
