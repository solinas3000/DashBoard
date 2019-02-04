import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitLineWorkspComponent } from './digit-line-worksp.component';

describe('DigitLineWorkspComponent', () => {
  let component: DigitLineWorkspComponent;
  let fixture: ComponentFixture<DigitLineWorkspComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitLineWorkspComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitLineWorkspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
