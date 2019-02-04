import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RessourceHardwareDetailComponent } from './ressource-hardware-detail.component';

describe('RessourceHardwareDetailComponent', () => {
  let component: RessourceHardwareDetailComponent;
  let fixture: ComponentFixture<RessourceHardwareDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RessourceHardwareDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RessourceHardwareDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
