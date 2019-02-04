import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentRhComponent } from './content-rh.component';

describe('ContentRhComponent', () => {
  let component: ContentRhComponent;
  let fixture: ComponentFixture<ContentRhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentRhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
