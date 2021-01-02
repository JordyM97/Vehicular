import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetalleServicioPage } from './detalle-servicio.page';

describe('DetalleServicioPage', () => {
  let component: DetalleServicioPage;
  let fixture: ComponentFixture<DetalleServicioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleServicioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleServicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
