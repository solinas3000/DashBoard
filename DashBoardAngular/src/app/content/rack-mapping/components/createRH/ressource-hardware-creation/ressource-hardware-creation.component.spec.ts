import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RessourceHardwareCreationComponent } from './ressource-hardware-creation.component';

describe('RessourceHardwareCreationComponent', () => {
  let component: RessourceHardwareCreationComponent;
  let fixture: ComponentFixture<RessourceHardwareCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RessourceHardwareCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RessourceHardwareCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
