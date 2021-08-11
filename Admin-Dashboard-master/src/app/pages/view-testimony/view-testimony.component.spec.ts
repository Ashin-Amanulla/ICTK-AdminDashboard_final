import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTestimonyComponent } from './view-testimony.component';

describe('ViewTestimonyComponent', () => {
  let component: ViewTestimonyComponent;
  let fixture: ComponentFixture<ViewTestimonyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTestimonyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTestimonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
