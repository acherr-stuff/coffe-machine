import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeMachineComponent } from './coffe-machine.component';

describe('CoffeMachineComponent', () => {
  let component: CoffeMachineComponent;
  let fixture: ComponentFixture<CoffeMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoffeMachineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoffeMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
