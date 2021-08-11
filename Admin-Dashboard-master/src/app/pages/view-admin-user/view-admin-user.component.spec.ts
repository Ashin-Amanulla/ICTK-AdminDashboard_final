import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdminUserComponent } from './view-admin-user.component';

describe('ViewAdminUserComponent', () => {
  let component: ViewAdminUserComponent;
  let fixture: ComponentFixture<ViewAdminUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAdminUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAdminUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
