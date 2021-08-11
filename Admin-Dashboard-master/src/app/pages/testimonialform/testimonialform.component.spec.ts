import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialformComponent } from './testimonialform.component';

describe('TestimonialformComponent', () => {
  let component: TestimonialformComponent;
  let fixture: ComponentFixture<TestimonialformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestimonialformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonialformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
