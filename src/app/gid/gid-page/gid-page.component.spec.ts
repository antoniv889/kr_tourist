import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GidPageComponent } from './gid-page.component';

describe('GidPageComponent', () => {
  let component: GidPageComponent;
  let fixture: ComponentFixture<GidPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GidPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GidPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
