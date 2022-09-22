import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

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
  productsTypeList = [
    {type_id: 'Toilet-type-t1' , type_code: 'Toilet-type-t1', detail: 'Toilet-type-t1' },
    {type_id: 'Toilet-type-t2' , type_code: 'Toilet-type-t2', detail: 'Toilet-type-t2' },
    {type_id: 'Toilet-type-t3' , type_code: 'Toilet-type-t3', detail: 'Toilet-type-t3' },
    {type_id: 'Toilet-type-t4' , type_code: 'Toilet-type-t4', detail: 'Toilet-type-t4' },
    {type_id: 'Toilet-type-t5' , type_code: 'Toilet-type-t5', detail: 'Toilet-type-t5' },

  ]
  // productsTypeList = [] as ProductType[];
  productsList = [
    { product_id: 1, product_name: 'CWD-5000' ,product_code : 'e9529f5s6xjw' , product_type_id: '' , product_type_code: '' , product_type_name: 'Toilet-type-t1'},
    { product_id: 2, product_name: 'ASW-5200' ,product_code : 'c5bdd43tvyap' , product_type_id: '' , product_type_code: '' , product_type_name: 'Toilet-type-t3'},
    { product_id: 3, product_name: 'CWQ-8000' ,product_code : '385334ew4l7d' , product_type_id: '' , product_type_code: '' , product_type_name: 'Toilet-type-t2'},
    { product_id: 4, product_name: 'CGE-4500 Rename' ,product_code : 'ae36d4duljqj' , product_type_id: '' , product_type_code: '' , product_type_name: 'Basin-type-t3'},
  ];

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }




  edit(product_id: number): void{
    this.router.navigate([`edit/${product_id}`]).then();
  }
}
