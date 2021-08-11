import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminUserComponent } from './add-admin-user.component';

describe('AddAdminUserComponent', () => {
  let component: AddAdminUserComponent;
  let fixture: ComponentFixture<AddAdminUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
