import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionPageComponent } from './attraction-page.component';

describe('AttractionPageComponent', () => {
  let component: AttractionPageComponent;
  let fixture: ComponentFixture<AttractionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttractionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttractionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
