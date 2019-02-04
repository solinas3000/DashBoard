import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructStudioComponent } from './struct-studio.component';

describe('StructStudioComponent', () => {
  let component: StructStudioComponent;
  let fixture: ComponentFixture<StructStudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructStudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructStudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
