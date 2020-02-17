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
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnDestroy, OnInit {
  model: any = {};
  deviceList;
  dtTrigger = new Subject();
  isupdate: boolean = false;
  deviceCode;
  deviceSerial;
  deviceDescription;
  selectedDevice;
  constructor(
    private creatorService: CreatorService,
    private selectorService: SelectorService,
    private modifiedService: ModifiedService
  ) {}

  ngOnInit() {
    $('body').addClass('user-background');
    this.getAllDevice();
  }

  getAllDevice() {
    this.dtTrigger.unsubscribe();
    this.dtTrigger = new Subject();
    this.selectorService.selectAllDevice().subscribe(
      data => {
        this.deviceList = data['data'];
        this.dtTrigger.next();
      },
      error => {
        alertify.error('faild load data');
      }
    );
  }
  createDevice() {
    if (!this.checkRequierd()) {
      alertify.error('Serial and Code is Requierd');
      return;
    }
    this.creatorService
      .CreateDevies(
        this.model.description ? this.model.description : '',
        this.model.propertyNo,
        this.model.serialNo
      )
      .subscribe(
        data => {
          if (data['status'] === 200) {
            alertify.success('success');
            this.getAllDevice();
            this.clearInput();
            return;
          }
          alertify.error('error');
          console.log(data['data']);
        },
        error => {
          alertify.error('error');
          console.log(error);
        }
      );
  }
  detailDev(index) {
    let device = this.deviceList[index];
    this.deviceCode = device.proprtyNo;
    this.deviceSerial = device.serialNo;
    this.deviceDescription = device.description;
  }

  deleteDev(index) {
    let device = this.deviceList[index];
    let id = device['id'];
    alertify.confirm(
      alertify.defaults.glossary.title = 'DeviceDeleteAlert',
      'Are You Sure Delete This Device?',
      () => {
        this.modifiedService.deleteDevice(id).subscribe(
          data => {
            if (data['status'] === 200) {
              alertify.success('success');
              this.getAllDevice();
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
  editDev(index) {
    let device = this.deviceList[index];
    this.selectedDevice = this.deviceList[index];
    this.model.description = device['description'];
    this.model.propertyNo = device['proprtyNo'];
    this.model.serialNo = device['serialNo'];
    this.isupdate = true;
  }
  editDevClick() {
    let id = this.selectedDevice['id'];
    if (!this.checkRequierd()) {
      alertify.error('Serial and Code is Requierd');
      return;
    }
    this.modifiedService
      .updateDevies(
        id,
        this.model.description ? this.model.description : '',
        this.model.propertyNo,
        this.model.serialNo
      )
      .subscribe(
        data => {
          if (data['status'] === 200) {
            alertify.success('success');
            this.getAllDevice();
            this.clearInput();
            return;
          }
          alertify.error('error');
          console.log(data['data']);
        },
        error => {
          alertify.error('error');
          console.log(error);
        }
      );
  }
  cancel() {
    this.isupdate = false;
    this.clearInput();
  }
  clearInput() {
    this.model.description = '';
    this.model.propertyNo = '';
    this.model.serialNo = '';
  }
  checkRequierd() {
    if (this.model.propertyNo && this.model.serialNo) {
      return true;
    }
    return false;
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
