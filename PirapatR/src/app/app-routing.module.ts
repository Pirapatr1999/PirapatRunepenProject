import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductComponent} from "./product/product.component";
import {MasterComponent} from "./master/master.component";
import {ProjectTestComponent} from "./Project/project-test/project-test.component";
import {ProjectAllComponent} from "./project-all/project-all.component";


const routes: Routes = [
  { path: 'product', component: ProductComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'Create', component: MasterComponent },
  { path: 'edit/:productid', component: MasterComponent },
  { path: 'Project-Test', component: ProjectTestComponent },
  { path: 'ProjectAll', component: ProjectAllComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
