import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormSubmitPage } from './form-submit.page';

const routes: Routes = [
  {
    path: '',
    component: FormSubmitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormSubmitPageRoutingModule {}
