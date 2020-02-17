import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CreatorService {
  constructor(private http: HttpClient) {}
  // url = 'http://localhost:3000/';
  url = 'http://37.156.28.19:3000/';
  CreateCategoty(catname: string, description: string) {
    const uri = this.url + 'api/category/addcategory';
    const token = localStorage.getItem('currentUser');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };

    const data = {
      name: catname,
      description: description
    };
    return this.http.post<any>(uri, data, httpOptions).map(result => {
      return result;
    });
  }

  CreateDevies(description: string, propertyNo: string, serialNo: string) {
    const uri = this.url + 'api/device/adddevice';
    const token = localStorage.getItem('currentUser');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };

    const data = {
      serialNo: serialNo,
      description: description,
      propertyNo: propertyNo
    };
    return this.http.post<any>(uri, data, httpOptions).map(result => {
      return result;
    });
  }

  CreateEvent(
    categoryId: number,
    description: string,
    startDate: string,
    endDate: number,
    locationId: number,
    name: string
  ) {
    const uri = this.url + 'api/event/addevent';
    const token = localStorage.getItem('currentUser');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };

    const data = {
      categoryId: categoryId,
      description: description,
      startDate: startDate,
      endDate: endDate,
      locationId: locationId,
      name: name
    };
    return this.http.post<any>(uri, data, httpOptions).map(result => {
      return result;
    });
  }

  CreateSchool(name: string, description: string) {
    const uri = this.url + 'api/location/addlocation';
    const token = localStorage.getItem('currentUser');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };

    const data = {
      name: name,
      description: description
    };
    return this.http.post<any>(uri, data, httpOptions).map(result => {
      return result;
    });
  }
  CreatePoll(
    question: string,
    description: string,
    categoryId: number,
    answer1: string,
    answer2: string,
    answer3: string,
    answer4: string,
    answer5: string
  ) {
    const uri = this.url + 'api/question/addquestion';
    const token = localStorage.getItem('currentUser');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };

    const data = {
      question: question,
      description: description,
      categoryId: categoryId,
      answer1: answer1,
      answer2: answer2,
      answer3: answer3,
      answer4: answer4,
      answer5: answer5
    };
    return this.http.post<any>(uri, data, httpOptions).map(result => {
      return result;
    });
  }
  CreateEventDevice(eventId: number, deviceId: number) {
    const uri = this.url + 'api/eventdevice/createeventdevice';
    const token = localStorage.getItem('currentUser');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };

    const data = {
      deviceId: deviceId,
      eventId: eventId
    };
    return this.http.post<any>(uri, data, httpOptions).map(result => {
      return result;
    });
  }
  CreateManager(
    type: string,
    username: string,
    password: string,
    locationId: number
  ) {
    const uri = this.url + 'api/user/createManager';
    const token = localStorage.getItem('currentUser');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };

    const data = {
      type: type,
      username: username,
      password: password,
      locationId: locationId
    };
    return this.http.post<any>(uri, data, httpOptions).map(result => {
      return result;
    });
  }
}
