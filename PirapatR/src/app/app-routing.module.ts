import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppProductComponent} from "./app.product/app.product.component";


const routes: Routes = [
  { path: 'Create', component: AppProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
