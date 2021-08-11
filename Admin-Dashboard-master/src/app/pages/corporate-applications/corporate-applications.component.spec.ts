import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateApplicationsComponent } from './corporate-applications.component';

describe('CorporateApplicationsComponent', () => {
  let component: CorporateApplicationsComponent;
  let fixture: ComponentFixture<CorporateApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateApplicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
