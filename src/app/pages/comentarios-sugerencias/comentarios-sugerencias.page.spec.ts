import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComentariosSugerenciasPage } from './comentarios-sugerencias.page';

describe('ComentariosSugerenciasPage', () => {
  let component: ComentariosSugerenciasPage;
  let fixture: ComponentFixture<ComentariosSugerenciasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComentariosSugerenciasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComentariosSugerenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
