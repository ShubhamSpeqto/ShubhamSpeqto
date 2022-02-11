import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginItselfComponent } from './user-login-itself.component';

describe('UserLoginItselfComponent', () => {
  let component: UserLoginItselfComponent;
  let fixture: ComponentFixture<UserLoginItselfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLoginItselfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginItselfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
