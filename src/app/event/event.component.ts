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
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  dateTimeRange: Date[];
  model: any = {};
  name: string;
  start: string;
  end: string;
  categorise;
  locations;
  selectedCategory;
  selectedLocation;
  eventList;
  selectedEvent;
  dtTrigger = new Subject();
  isupdate: boolean = false;
  category;
  location;
  startDate;
  endDate;
  eventName;
  description;
  deviceList;
  list: number[] = [];
  asignList: number[] = [];
  checkall = false;
  constructor(
    private selectorService: SelectorService,
    private createtorService: CreatorService,
    private modifiedService: ModifiedService
  ) {}

  ngOnInit() {
    $('body').addClass('user-background');
    this.selectorService.selectAllCategory().subscribe(data => {
      this.categorise = data['data'];
      console.log(data['data']);
    });
    this.selectorService.selectAllLocation().subscribe(data => {
      this.locations = data['data'];
      console.log(data['data']);
    });
    this.getAllEvents();
    this.buildDeviceList();
  }
  toggleSelection() {
    if (this.checkall) {
      $('.deviceCheck').prop('checked', false);
      //remove all device from list
      this.list = [];

      this.checkall = false;
    } else {
      // add all device to list
      this.list = [];
      for (let i = 0; i < this.deviceList.length; i++) {
        this.list.push(this.deviceList[i].id);
      }
      $('.deviceCheck').prop('checked', true);
      this.checkall = true;
    }
  }
  buildDeviceList() {
    this.selectorService.selectAllDevice().subscribe(
      data => {
        this.deviceList = data['data'];
      },
      error => {}
    );
  }

  getAllEvents() {
    this.dtTrigger.unsubscribe();
    this.dtTrigger = new Subject();
    this.selectorService.selectAllEvents().subscribe(
      data => {
        this.eventList = data['data'];
        this.dtTrigger.next();
      },
      error => {
        alertify.error('faild load data');
        console.log(error);
      }
    );
  }
  addtolist(id) {
    let index = this.asignList.indexOf(id);
    if (index !== -1) {
      this.asignList.splice(index, 1);
      console.log(this.asignList);
      return;
    }

    this.asignList.push(id);
    console.log(this.asignList);
  }
  createEvent() {
    if (this.checkRequird()) {
      this.model.categoryId = this.selectedCategory['FLD_PK_CATEGORY_CO'];
      this.model.locationId = this.selectedLocation['id'];
      this.model.startDate = this.dateTimeRange[0];
      this.model.endDate = this.dateTimeRange[1];

      this.createtorService
        .CreateEvent(
          this.model.categoryId,
          this.model.description,
          this.model.startDate,
          this.model.endDate,
          this.model.locationId,
          this.model.name
        )
        .subscribe(
          data => {
            if (data['status'] === 200) {
              let id = data.data[0]['event_co'];
              for (let i = 0; i < this.list.length; i++) {
                this.createtorService
                  .CreateEventDevice(id, this.list[i])
                  .subscribe(data => {}, error => {});
              }

              alertify.success('success');

              this.cancel();
              this.getAllEvents();
              return;
            }
            alertify.error('error');
          },
          error => {
            alertify.error('error');
            console.log(error);
          }
        );
    }
  }
  detailEve(index) {
    let event = this.eventList[index];
    this.category = event['categoryName'];
    this.location = event['locationName'];
    this.startDate = event['startDate'];
    this.endDate = event['endDate'];
    this.eventName = event['name'];
    this.description = event['description'];
  }
  editEve(index) {
    this.isupdate = true;
    this.selectedEvent = this.eventList[index];
    let event = this.eventList[index];
    this.model.name = event['name'];
    let sc = this.categorise;
    this.selectedCategory = this.categorise.filter(
      x => x['FLD_PK_CATEGORY_CO'] == event['categoryid']
    )[0];
    this.selectedLocation = this.locations.filter(
      x => x['id'] == event['locationid']
    )[0];
    this.model.description = event['description'];
    this.dateTimeRange = [
      new Date(event['startDate']),
      new Date(event['endDate'])
    ];
    this.selectorService
      .selectDeviceByEvent(this.selectedEvent['id'])
      .subscribe(
        data => {
          this.setlist(data['data']);
        },
        error => {}
      );
  }
  setlist(data) {
    $('.deviceCheck').prop('checked', false);
    this.checkall = false;
    $('#masterCheck').prop('checked', false);
    for (let i = 0; i < data.length; i++) {
      this.list = [];
      let id = data[i].deviceId;
      this.list.push(id);
      $('#check' + id).prop('checked', true);
    }
  }
  editEveClick() {
    let id = this.selectedEvent['id'];
    this.model.categoryId = this.selectedCategory['FLD_PK_CATEGORY_CO'];
    this.model.locationId = this.selectedLocation['id'];
    this.model.startDate = this.dateTimeRange[0];
    this.model.endDate = this.dateTimeRange[1];

    this.modifiedService
      .updateEvent(
        id,
        this.model.categoryId,
        this.model.description,
        this.model.startDate,
        this.model.endDate,
        this.model.locationId,
        this.model.name
      )
      .subscribe(
        data => {
          if (data['status'] === 200) {
            this.modifiedService.deleteEventDeviceByEvent(id).subscribe(
              data => {
                if (data['status'] === 200) {
                  for (let i = 0; i < this.list.length; i++) {
                    this.createtorService
                      .CreateEventDevice(id, this.list[i])
                      .subscribe(
                        data => {
                          this.getAllEvents();
                        },
                        error => {
                          console.log(error);
                        }
                      );
                  }
                }
              },
              error => {}
            );
            alertify.success('success');
            this.cancel();
            this.getAllEvents();
            return;
          }
          alertify.error('error');
        },
        error => {
          alertify.error('error');
          console.log(error);
        }
      );
  }
  deleteEve(index) {
    let event = this.eventList[index];
    let id = event['id'];
    alertify.confirm(
      (alertify.defaults.glossary.title = 'EventDeleteAlert'),
      'Are You Sure Delete This Event?',
      () => {
        this.modifiedService.deleteEvent(id).subscribe(
          data => {
            if (data['status'] === 200) {
              alertify.success('success');
              this.getAllEvents();
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
  cancel() {
    this.isupdate = false;
    let event = '';
    this.model.name = '';
    this.selectedCategory = '';
    this.selectedLocation = '';
    this.model.description = '';
    this.dateTimeRange = [new Date(event['']), new Date(event[''])];
  }
  checkRequird() {
    if (!this.model.name && !this.selectedCategory && !this.selectedLocation) {
      alertify.error('all field is requierd');
      return false;
    }
    if (typeof this.dateTimeRange === 'undefined') {
      alertify.error('Please Insert DateTime');
      return false;
    }
    if (this.dateTimeRange[0] === null || this.dateTimeRange[1] === null) {
      alertify.error('Please Insert DateTime');
      return false;
    }
    return true;
  }
}
