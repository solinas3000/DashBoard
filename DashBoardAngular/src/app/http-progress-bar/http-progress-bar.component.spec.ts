import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpProgressBarComponent } from './http-progress-bar.component';

describe('HttpProgressBarComponent', () => {
  let component: HttpProgressBarComponent;
  let fixture: ComponentFixture<HttpProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpProgressBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
