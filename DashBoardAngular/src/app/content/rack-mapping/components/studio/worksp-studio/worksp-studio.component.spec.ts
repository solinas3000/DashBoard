import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspStudioComponent } from './worksp-studio.component';

describe('WorkspStudioComponent', () => {
  let component: WorkspStudioComponent;
  let fixture: ComponentFixture<WorkspStudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkspStudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspStudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
