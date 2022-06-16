import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComerceComponent } from './new-comerce.component';

describe('NewComerceComponent', () => {
  let component: NewComerceComponent;
  let fixture: ComponentFixture<NewComerceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewComerceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewComerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
