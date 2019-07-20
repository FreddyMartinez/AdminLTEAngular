import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargueMasivoComponent } from './cargue-masivo.component';

describe('CargueMasivoComponent', () => {
  let component: CargueMasivoComponent;
  let fixture: ComponentFixture<CargueMasivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargueMasivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargueMasivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
