import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserKycListComponent } from './user-kyc-list.component';

describe('UserKycListComponent', () => {
  let component: UserKycListComponent;
  let fixture: ComponentFixture<UserKycListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserKycListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserKycListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
