import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAdminUserComponent } from './delete-admin-user.component';

describe('DeleteAdminUserComponent', () => {
  let component: DeleteAdminUserComponent;
  let fixture: ComponentFixture<DeleteAdminUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAdminUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAdminUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
