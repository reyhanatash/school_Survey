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
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  model: any = {};
  dtTrigger = new Subject();
  isupdate: boolean = false;
  locations;
  location;
  managers;
  selectedManager;
  selectedLocation;
  selectedType = '';
  constructor(
    private selectorService: SelectorService,
    private createtorService: CreatorService,
    private modifiedService: ModifiedService
  ) {}

  ngOnInit() {
    $('body').addClass('user-background');
    this.selectorService.selectAllLocation().subscribe(data => {
      this.locations = data['data'];
      console.log(data['data']);
    });
    this.buildManagerList();
  }
  createManager() {
    if (this.checkFields()) {
      if (this.selectedType === '2') {
        this.model.locationId = this.selectedLocation['id'];
      } else {
        this.model.locationId = 1;
      }
      this.createtorService
        .CreateManager(
          this.selectedType,
          this.model.username,
          sha256(this.model.password),
          this.model.locationId
        )
        .subscribe(
          data => {
            if (data['status'] === 200) {
              alertify.success('success');
              this.buildManagerList();
              this.cancel();
              return;
            }
            alertify.error('error');
          },
          error => {
            console.log(error);
            alertify.error('error');
          }
        );
    }
  }
  editManClick() {}
  deleteManager(index) {
    alertify.confirm(
      'Are You Sure Delete This Manager?',
      () => {
        let id = this.managers[index]['FLD_PK_MANAGER_CO'];
        this.modifiedService.deleteManager(id).subscribe(
          data => {
            if (data['status'] === 200) {
              alertify.success('success');
              this.buildManagerList();
            }
          },
          error => {
            alertify.success('error');
          }
        );
      },
      function() {}
    );
  }
  cancel() {
    this.selectedType = '';
    this.model.username = '';
    this.model.password = '';
    this.model.repassword = '';
    this.selectedLocation = '';
    this.model.description = '';
  }
  buildManagerList() {
    this.dtTrigger.unsubscribe();
    this.dtTrigger = new Subject();
    this.selectorService.getManager().subscribe(
      data => {
        this.managers = data['data'];
        this.dtTrigger.next();
      },
      error => {
        console.log(error);
      }
    );
  }
  checkFields() {
    if (
      !this.selectedType &&
      !this.model.name &&
      !this.model.password &&
      !this.model.repassword
    ) {
      alertify.error('all field is requierd');
      return false;
    }
    if (this.selectedType === '2' && !this.selectedLocation) {
      alertify.error('all field is requierd');
      return false;
    }
    if (this.model.password !== this.model.repassword) {
      alertify.error('password and confirm is diffrent');
      return false;
    }
    return true;
  }
}
