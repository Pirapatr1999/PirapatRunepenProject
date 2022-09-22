import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';
import { ProductComponent } from './view/product/product.component';
import { MasterComponent } from './view/master/master.component';
import {ModalModule} from "ngx-bootstrap/modal";
import { UploadComponent } from './Upload/upload/upload.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import { ProjectTestComponent } from './view/Project/project-test/project-test.component';
import { ProjectAllComponent } from './view/project-all/project-all.component';
import {ProjectAComponent} from "./view/project-all/project-a/project-a.component";
import {AlertModule} from "ngx-bootstrap/alert";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FeatherModule } from 'angular-feather';
import {Camera, Github, Heart} from "angular-feather/icons";
import { SharedComponent } from './shared/shared/shared.component';
import { ViewComponent } from './view/view/view.component';

const icons = {
  Camera,
  Heart,
  Github
};

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    MasterComponent,
    UploadComponent,
    ProjectTestComponent,
    ProjectAllComponent,
    ProjectAComponent,
    SharedComponent,
    ViewComponent,
  ],
  imports: [
    FeatherModule.pick(icons),
    CollapseModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    AccordionModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    TooltipModule.forRoot(),
    NgSelectModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    FeatherModule
  ]
})
export class AppModule { }
