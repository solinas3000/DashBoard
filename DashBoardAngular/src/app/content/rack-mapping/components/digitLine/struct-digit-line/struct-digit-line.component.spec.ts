import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructDigitLineComponent } from './struct-digit-line.component';

describe('StructDigitLineComponent', () => {
  let component: StructDigitLineComponent;
  let fixture: ComponentFixture<StructDigitLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructDigitLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructDigitLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
