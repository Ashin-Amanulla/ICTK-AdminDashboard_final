import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnershipApplicationComponent } from './partnership-application.component';

describe('PartnershipApplicationComponent', () => {
  let component: PartnershipApplicationComponent;
  let fixture: ComponentFixture<PartnershipApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnershipApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnershipApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
