import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResetpssPage } from './resetpss.page';

describe('ResetpssPage', () => {
  let component: ResetpssPage;
  let fixture: ComponentFixture<ResetpssPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetpssPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResetpssPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
