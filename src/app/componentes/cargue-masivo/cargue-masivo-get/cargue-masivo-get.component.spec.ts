import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargueMasivoGetComponent } from './cargue-masivo-get.component';

describe('CargueMasivoGetComponent', () => {
  let component: CargueMasivoGetComponent;
  let fixture: ComponentFixture<CargueMasivoGetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargueMasivoGetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargueMasivoGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
