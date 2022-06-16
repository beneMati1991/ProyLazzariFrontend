import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarComerceComponent } from './editar-comerce.component';

describe('EditarComerceComponent', () => {
  let component: EditarComerceComponent;
  let fixture: ComponentFixture<EditarComerceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarComerceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarComerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
