import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailWorkspDynamicComponent } from './detail-worksp-dynamic.component';

describe('DetailWorkspDynamicComponent', () => {
  let component: DetailWorkspDynamicComponent;
  let fixture: ComponentFixture<DetailWorkspDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailWorkspDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailWorkspDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
