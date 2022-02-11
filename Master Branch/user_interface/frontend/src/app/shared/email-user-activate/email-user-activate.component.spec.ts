import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailUserActivateComponent } from './email-user-activate.component';

describe('EmailUserActivateComponent', () => {
  let component: EmailUserActivateComponent;
  let fixture: ComponentFixture<EmailUserActivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailUserActivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailUserActivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
