import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentDetailsByIdComponent } from './assignment-details-by-id.component';

describe('AssignmentDetailsByIdComponent', () => {
  let component: AssignmentDetailsByIdComponent;
  let fixture: ComponentFixture<AssignmentDetailsByIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentDetailsByIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentDetailsByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
