import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleClickDialogComponent } from './double-click-dialog.component';

describe('DoubleClickDialogComponent', () => {
  let component: DoubleClickDialogComponent;
  let fixture: ComponentFixture<DoubleClickDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoubleClickDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoubleClickDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
