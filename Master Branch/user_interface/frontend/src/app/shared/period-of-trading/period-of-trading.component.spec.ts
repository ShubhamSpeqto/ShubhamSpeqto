import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodOfTradingComponent } from './period-of-trading.component';

describe('PeriodOfTradingComponent', () => {
  let component: PeriodOfTradingComponent;
  let fixture: ComponentFixture<PeriodOfTradingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodOfTradingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodOfTradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
