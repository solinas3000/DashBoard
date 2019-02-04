import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RackWorkspComponent } from './rack-worksp.component';


describe('RackWorkspComponent', () => {
  let component: RackWorkspComponent;
  let fixture: ComponentFixture<RackWorkspComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RackWorkspComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RackWorkspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
