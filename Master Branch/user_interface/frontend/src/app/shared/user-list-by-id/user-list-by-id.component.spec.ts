import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListByIdComponent } from './user-list-by-id.component';

describe('UserListByIdComponent', () => {
  let component: UserListByIdComponent;
  let fixture: ComponentFixture<UserListByIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListByIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
