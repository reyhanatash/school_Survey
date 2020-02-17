import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  CreatorService,
  SelectorService,
  ModifiedService
} from '../_services/index';
import { Subject } from 'rxjs';
import * as alertify from '../../scripts/alertify.min';
import 'rxjs/add/operator/map';
import * as sha256 from 'sha256/lib/sha256.js';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit, OnDestroy {
  model: any = {};
  schoolList;
  selectedSchool;
  dtTrigger = new Subject();
  isupdate: boolean = false;
  schoolName;
  schoolDescription;
  constructor(
    private creatorService: CreatorService,
    private selectorService: SelectorService,
    private modifiedService: ModifiedService
  ) {}

  ngOnInit() {
    $('body').addClass('user-background');
    this.getAllSchools();
  }
  getAllSchools() {
    this.dtTrigger.unsubscribe();
    this.dtTrigger = new Subject();
    this.selectorService.selectAllLocation().subscribe(
      data => {
        this.schoolList = data['data'];
        this.dtTrigger.next();
      },
      error => {
        alertify.error('faild load data');
        console.log(error);
      }
    );
  }
  createSchool() {
    if (!this.checkRequierd()) {
      alertify.error('name is requierd');
      return;
    }
    this.creatorService
      .CreateSchool(this.model.name, this.model.description)
      .subscribe(
        data => {
          if (data['status'] === 200) {
            alertify.success('success');
            this.getAllSchools();
            this.cancel();
            return;
          }
          alertify.error('error');
          console.log(data);
        },
        error => {
          alertify.error('error');
          console.log(error);
        }
      );
  }
  detailSch(index) {
    let school = this.schoolList[index];
    this.schoolName = school['locationName'];
    this.schoolDescription = school['description'];
  }
  deleteSch(index) {
    let id = this.schoolList[index]['id'];
    
    alertify.confirm(
      alertify.defaults.glossary.title = 'SchoolDeleteAlert',
      'Are You Sure Delete This School?',
      () => {
        this.modifiedService.deleteSchool(id).subscribe(
          data => {
            if (data['status'] === 200) {
              alertify.success('success');
              this.getAllSchools();
              return;
            }
            alertify.error('error');
            console.log(data);
          },
          error => {
            alertify.error('error');
            console.log(error);
          }
        );
      },
      function() {}
    );
  }
  editSch(index) {
    let school = this.schoolList[index];
    this.selectedSchool = this.schoolList[index];
    this.model.name = school['locationName'];
    this.model.description = school['description'];
    this.isupdate = true;
  }
  editSchClick() {
    let id = this.selectedSchool['id'];
    if (!this.checkRequierd()) {
      alertify.error('name is requierd');
      return;
    }
    this.modifiedService
      .updateSchool(id, this.model.name, this.model.description)
      .subscribe(
        data => {
          if (data['status'] === 200) {
            alertify.success('success');
            this.getAllSchools();
            this.cancel();
            return;
          }
          alertify.error('error');
          console.log(data);
        },
        error => {
          alertify.error('error');
          console.log(error);
        }
      );
  }
  checkRequierd() {
    if (this.model.name) return true;
    return false;
  }
  cancel() {
    this.model.name = '';
    this.model.description = '';
    this.isupdate = false;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
