import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChangeComponent } from './dialog-change.component';

describe('DialogChangeComponent', () => {
  let component: DialogChangeComponent;
  let fixture: ComponentFixture<DialogChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
