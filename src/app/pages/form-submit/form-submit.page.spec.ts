import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormSubmitPage } from './form-submit.page';

describe('FormSubmitPage', () => {
  let component: FormSubmitPage;
  let fixture: ComponentFixture<FormSubmitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSubmitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormSubmitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
