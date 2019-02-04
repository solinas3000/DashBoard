import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RessourceHardwareCreationOpenCloseSnackComponent } from './ressource-hardware-creation-open-close-snack.component';

describe('RessourceHardwareCreationOpenCloseSnackComponent', () => {
  let component: RessourceHardwareCreationOpenCloseSnackComponent;
  let fixture: ComponentFixture<RessourceHardwareCreationOpenCloseSnackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RessourceHardwareCreationOpenCloseSnackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RessourceHardwareCreationOpenCloseSnackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
