import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServicioModalPage } from './servicio-modal.page';

describe('ServicioModalPage', () => {
  let component: ServicioModalPage;
  let fixture: ComponentFixture<ServicioModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicioModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicioModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
