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
  productList = [
    "Pirapat", "Save", "Runepen"
  ];
  productListOjb: {
    id: string,
    name: string,
    lastname: string
  };

  constructor(private fb: FormBuilder,
              private sanitizer: DomSanitizer,
              private router: Router,
              private modalService: BsModalService,
              private changeDetectorRef: ChangeDetectorRef,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.productListOjb = {
      id: "1",
      name: "Pirapat",
      lastname: "Runepen"
    }
  }

  removeList(item: any): void{
    this.productList.forEach((resPL, idxPL) => {
      if (resPL == item){
        this.productList.splice(idxPL, 1);

      }
      console.log(resPL);
    })
    console.log(item);

  }

  addProduct(item: any): void{
    this.productList.unshift(item);

  }
}
//
