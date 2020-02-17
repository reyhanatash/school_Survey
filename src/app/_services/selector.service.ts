import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SelectorService {
  // url = 'http://localhost:3000/';
  url = 'http://37.156.28.19:3000/';
  constructor(private http: HttpClient) {}

  selectAllCategory() {
    const uri = this.url + 'api/category/allcategory';
    const token = localStorage.getItem('currentUser');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };
    return this.http.get(uri, httpOptions).map(result => {
      return result;
    });
  }
  selectAllLocation() {
    const uri = this.url + 'api/location/alllocation';
    const token = localStorage.getItem('currentUser');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };
    return this.http.get(uri, httpOptions).map(result => {
      return result;
    });
  }
  selectAllDevice() {
    const uri = this.url + 'api/device/allDevieces';
    const token = localStorage.getItem('currentUser');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };
    return this.http.get(uri, httpOptions).map(result => {
      return result;
    });
  }
  selectAllEvents() {
    const uri = this.url + 'api/event/allEvents';
    const token = localStorage.getItem('currentUser');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };
    return this.http.get(uri, httpOptions).map(result => {
      return result;
    });
  }
  selectAllQuestions() {
    const uri = this.url + 'api/question/allquestion';
    const token = localStorage.getItem('currentUser');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };
    return this.http.get(uri, httpOptions).map(result => {
      return result;
    });
  }
  selectDeviceByEvent(eventId: number) {
    const uri = this.url + 'api/eventdevice/selectdevicebyevent';
    const token = localStorage.getItem('currentUser');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };
    const data = {
      eventId: eventId
    };
    return this.http.post<any>(uri, data, httpOptions).map(result => {
      return result;
    });
  }
  getResult(eventId: number) {
    const uri = this.url + 'api/eventdevice/getresult';
    const token = localStorage.getItem('currentUser');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };
    const data = {
      eventId: eventId
    };
    return this.http.post<any>(uri, data, httpOptions).map(result => {
      return result;
    });
  }
  getManager() {
    const uri = this.url + 'api/user/getManagers';
    const token = localStorage.getItem('currentUser');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };
    return this.http.get(uri, httpOptions).map(result => {
      return result;
    });
  }
  managerEvent() {
    const uri = this.url + 'api/event/managerevent';
    const token = localStorage.getItem('currentUser');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };
    return this.http.get(uri, httpOptions).map(result => {
      return result;
    });
  }
}
