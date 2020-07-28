import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteReviewPageComponent } from './route-review-page.component';

describe('RouteReviewPageComponent', () => {
  let component: RouteReviewPageComponent;
  let fixture: ComponentFixture<RouteReviewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteReviewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteReviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
