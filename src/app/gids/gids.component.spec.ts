import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GidsComponent } from './gids.component';

describe('GidsComponent', () => {
  let component: GidsComponent;
  let fixture: ComponentFixture<GidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GidsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
