import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  CreatorService,
  SelectorService,
  ModifiedService
} from '../_services/index';
import { Subject } from 'rxjs';
import * as alertify from '../../scripts/alertify.min';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnDestroy, OnInit {
  model: any = {};
  categoryList;
  slectedcategory;
  dtTrigger = new Subject();
  categoryName: string;
  categoryDiscription: string;
  isupdate: boolean = false;
  constructor(
    private creatorService: CreatorService,
    private selectorService: SelectorService,
    private modifiedService: ModifiedService
  ) {}

  ngOnInit() {
    $('body').addClass('user-background');
    this.getCategoryList();
  }
  getCategoryList() {
    this.dtTrigger.unsubscribe();
    this.dtTrigger = new Subject();
    this.selectorService.selectAllCategory().subscribe(
      data => {
        this.categoryList = data['data'];
        this.dtTrigger.next();
      },
      error => {
        alertify.error('faild load data');
      }
    );
  }
  CreateCat() {
    if (!this.checkRequierd()) {
      alertify.error('Please insert name');
      return;
    }
    this.creatorService
      .CreateCategoty(
        this.model.catName,
        this.model.catDesc ? this.model.catDesc : ''
      )
      .subscribe(
        data => {
          alertify.success('success');
          this.model.catName = '';
          this.model.catDesc = '';
          this.getCategoryList();
        },
        error => {
          alertify.error('error');
        }
      );
  }
  detailCat(index) {
    let category = this.categoryList[index];
    this.categoryName = category['FLD_CATEGORY'];
    this.categoryDiscription = category['FLD_DECRIPTION'];
  }
  editCat(index) {
    let category = this.categoryList[index];
    this.slectedcategory = this.categoryList[index];
    this.model.catName = category['FLD_CATEGORY'];
    this.model.catDesc = category['FLD_DECRIPTION'];
    this.isupdate = true;
  }
  editCatClick() {
    if (!this.checkRequierd()) {
      alertify.error('Please insert name');
      return;
    }
    let id = this.slectedcategory['FLD_PK_CATEGORY_CO'];
    this.modifiedService
      .updateCategory(
        id,
        this.model.catName,
        this.model.catDesc ? this.model.catDesc : ''
      )
      .subscribe(
        data => {
          alertify.success('success');
          this.model.catName = '';
          this.model.catDesc = '';
          this.isupdate = false;
          this.getCategoryList();
        },
        error => {
          alertify.error('error');
        }
      );
  }
  cancel() {
    this.model.catName = '';
    this.model.catDesc = '';
    this.isupdate = false;
  }
  deleteCat(index) {
    let category = this.categoryList[index];
  
    alertify.confirm(
      alertify.defaults.glossary.title = 'CategoryDeleteAlert',
      'Are You Sure Delete This Category?',
      () => {
        this.modifiedService
          .deleteCategory(category['FLD_PK_CATEGORY_CO'])
          .subscribe(
            data => {
              if (data['status'] === 200) {
                alertify.success('success');
                this.getCategoryList();
                return;
              }
              if (data.data['sqlState'] === '23000') {
                alertify.error('foreign key');
                return;
              }
              alertify.error('error');
            },
            error => {
              alertify.error('error');
            }
          );
      },
      function() {}
    );
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  checkRequierd() {
    if (this.model.catName) {
      return true;
    }
    return false;
  }
}
