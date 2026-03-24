import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInput } from './check-input';

describe('CheckInput', () => {
  let component: CheckInput;
  let fixture: ComponentFixture<CheckInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
