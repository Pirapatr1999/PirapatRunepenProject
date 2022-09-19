import {ProductType} from 'src/app/app';
import {Component, NgModule, OnInit, ViewChild} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormControl, FormGroup, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'PirapatR';
  isLoadingSwitch = false;

  selectedCar: any;
  value = false;


  status = [
    {
      id: 'Y',
      label: 'Active'
    },
    {
      id: 'N',
      label: 'Inactive'
    }];


  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];

  // productsTypeList = [] as ProductType[];
  productsTypeList = [
    { id: 1, name: 'Volvo1' },
    { id: 2, name: 'Saab2' },
    { id: 3, name: 'Opel3' },
    { id: 4, name: 'Audi4' },
  ];


  constructor() { }

  ngOnInit(): void { }
}


