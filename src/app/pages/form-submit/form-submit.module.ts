import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormSubmitPageRoutingModule } from './form-submit-routing.module';

import { FormSubmitPage } from './form-submit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormSubmitPageRoutingModule
  ],
  declarations: [FormSubmitPage]
})
export class FormSubmitPageModule {}
