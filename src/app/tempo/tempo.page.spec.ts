import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TempoPage } from './tempo.page';

describe('TempoPage', () => {
  let component: TempoPage;
  let fixture: ComponentFixture<TempoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TempoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
