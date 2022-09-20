import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {count} from "rxjs";
import {FormBuilder} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-project-test',
  templateUrl: './project-test.component.html',
  styleUrls: ['./project-test.component.scss']
})
export class ProjectTestComponent implements OnInit {
  data: any;
  productList = [
    {id: '1', name: 'A'},
    {id: '2', name: 'B'},
    {id: '3', name: 'C'},
    {id: '4', name: 'D'},
    {id: '5', name: 'E'},
    {id: '6', name: 'F'},
    {id: '7', name: 'G'},
  ]
  productListOjb = {
    id: '1', name: 'A'
  };

  constructor(private fb: FormBuilder,
              private sanitizer: DomSanitizer,
              private router: Router,
              private modalService: BsModalService,
              private changeDetectorRef: ChangeDetectorRef,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  removeList(event: any): void{
    this.productList.forEach((resPL, idxPL) => {
      this.productList.splice(idxPL);
      console.log(resPL);
    })
    console.log(event);

  }

  addProductList(): void{
    const data = this.fb.group({
      id: 'New ID', name: 'New Name' ,
    })
    // @ts-ignore
    this.productList.unshift(data)
  }
}
