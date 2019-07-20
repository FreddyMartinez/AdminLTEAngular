import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargueMasivoDetalleComponent } from './cargue-masivo-detalle.component';

describe('CargueMasivoDetalleComponent', () => {
  let component: CargueMasivoDetalleComponent;
  let fixture: ComponentFixture<CargueMasivoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargueMasivoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargueMasivoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
