import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTestimonyComponent } from './edit-testimony.component';

describe('EditTestimonyComponent', () => {
  let component: EditTestimonyComponent;
  let fixture: ComponentFixture<EditTestimonyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTestimonyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTestimonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
