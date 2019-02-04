import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructAdminComponent } from './struct-admin.component';

describe('StructAdminComponent', () => {
  let component: StructAdminComponent;
  let fixture: ComponentFixture<StructAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
