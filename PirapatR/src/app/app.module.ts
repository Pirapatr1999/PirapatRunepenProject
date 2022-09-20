import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { MasterComponent } from './master/master.component';
import {ModalModule} from "ngx-bootstrap/modal";
import { UploadComponent } from './Upload/upload/upload.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import { ProjectTestComponent } from './Project/project-test/project-test.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    MasterComponent,
    UploadComponent,
    ProjectTestComponent,
  ],
  imports: [
    CollapseModule,
    BrowserAnimationsModule,
    AccordionModule,
    ModalModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    TooltipModule.forRoot(),
    NgSelectModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
