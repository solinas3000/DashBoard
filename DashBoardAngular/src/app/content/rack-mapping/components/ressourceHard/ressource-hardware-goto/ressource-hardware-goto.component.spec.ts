import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RessourceHardwareGotoComponent } from './ressource-hardware-goto.component';

describe('RessourceHardwareGotoComponent', () => {
  let component: RessourceHardwareGotoComponent;
  let fixture: ComponentFixture<RessourceHardwareGotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RessourceHardwareGotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RessourceHardwareGotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
