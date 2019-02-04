import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructWorkspaceComponent } from './struct-workspace.component';

describe('StructDigitLineComponent', () => {
  let component: StructWorkspaceComponent;
  let fixture: ComponentFixture<StructWorkspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructWorkspaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
