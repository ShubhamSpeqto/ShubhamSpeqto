import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKycComponent } from './admin-kyc.component';

describe('AdminKycComponent', () => {
  let component: AdminKycComponent;
  let fixture: ComponentFixture<AdminKycComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminKycComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
