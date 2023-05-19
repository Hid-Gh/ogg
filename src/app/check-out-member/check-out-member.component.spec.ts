import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutMemberComponent } from './check-out-member.component';

describe('CheckOutMemberComponent', () => {
  let component: CheckOutMemberComponent;
  let fixture: ComponentFixture<CheckOutMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckOutMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckOutMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
