import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddLineComponent } from './dialog-add-line.component';

describe('DialogAddLineComponent', () => {
  let component: DialogAddLineComponent;
  let fixture: ComponentFixture<DialogAddLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
