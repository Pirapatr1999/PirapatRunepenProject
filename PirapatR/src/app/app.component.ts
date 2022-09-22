import {ProductType} from 'src/app/app';
import {Component, NgModule, OnInit, ViewChild} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormControl, FormGroup, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import {faHippo} from "@fortawesome/free-solid-svg-icons/faHippo";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  faCoffee = faCoffee;
  faHippo = faHippo;

  constructor() { }

  ngOnInit(): void { }
}


