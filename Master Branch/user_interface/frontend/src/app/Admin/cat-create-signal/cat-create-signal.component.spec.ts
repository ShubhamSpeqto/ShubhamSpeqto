import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatCreateSignalComponent } from './cat-create-signal.component';

describe('CatCreateSignalComponent', () => {
  let component: CatCreateSignalComponent;
  let fixture: ComponentFixture<CatCreateSignalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatCreateSignalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatCreateSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
