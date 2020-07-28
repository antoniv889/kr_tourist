import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionsObjectComponent } from './attractions-object.component';

describe('AttractionsObjectComponent', () => {
  let component: AttractionsObjectComponent;
  let fixture: ComponentFixture<AttractionsObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttractionsObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttractionsObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
