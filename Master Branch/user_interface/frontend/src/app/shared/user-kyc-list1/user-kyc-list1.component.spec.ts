import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserKycList1Component } from './user-kyc-list1.component';

describe('UserKycList1Component', () => {
  let component: UserKycList1Component;
  let fixture: ComponentFixture<UserKycList1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserKycList1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserKycList1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
