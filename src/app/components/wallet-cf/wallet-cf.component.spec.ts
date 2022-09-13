import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletCfComponent } from './wallet-cf.component';

describe('WalletCfComponent', () => {
  let component: WalletCfComponent;
  let fixture: ComponentFixture<WalletCfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletCfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletCfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
