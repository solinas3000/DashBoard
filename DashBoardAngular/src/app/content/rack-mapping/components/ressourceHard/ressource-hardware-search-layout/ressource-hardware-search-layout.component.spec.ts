import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RessourceHardwareSearchLayoutComponent } from './ressource-hardware-search-layout.component';

describe('RessourceHardwareSearchLayoutComponent', () => {
  let component: RessourceHardwareSearchLayoutComponent;
  let fixture: ComponentFixture<RessourceHardwareSearchLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RessourceHardwareSearchLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RessourceHardwareSearchLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
