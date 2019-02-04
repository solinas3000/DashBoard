import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RackMappingHistoryComponent } from './rack-mapping-history.component';

describe('RackMappingHistoryComponent', () => {
  let component: RackMappingHistoryComponent;
  let fixture: ComponentFixture<RackMappingHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RackMappingHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RackMappingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
