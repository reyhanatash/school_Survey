import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ModifiedService {
  // url = 'http://localhost:3000/';
  url = 'http://37.156.28.19:3000/';
  constructor(private http: HttpClient) {}

  updateCategory(id: number, catname: string, description: string) {
    const uri = this.url + 'api/category/updatecategory';
    const token = localStorage.getItem('currentUser');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };
    const data = {
      id: id,
      name: catname,
      description: description
    };
    return this.http.post<any>(uri, data, httpOptions).map(result => {
      return result;
    });
  }
  deleteCategory(id: number) {
    const uri = this.url + 'api/category/deletecategory';
    const token = localStorage.getItem('currentUser');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };
    const data = {
      id: id
    };
    return this.http.post<any>(uri, data, httpOptions).map(result => {
      return result;
    });
  }

  updateDevies(
    id: number,
    description: string,
    PropertyNo: string,
    serialNo: string
  ) {
    const uri = this.url + 'api/device/adddevice';
    const token = localStorage.getItem('currentUser');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };

    const data = {
      id: id,
      serialNo: serialNo,
      description: description,
      propertyNo: PropertyNo
    };
    return this.http.post<any>(uri, data, httpOptions).map(result => {
      return result;
    });
  }

  deleteDevice(id: number) {
    const uri = this.url + 'api/device/deleteDevice';
    const token = localStorage.getItem('currentUser');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };
    const data = {
      id: id
    };
    return this.http.post<any>(uri, data, httpOptions).map(result => {
      return result;
    });
  }

  updateEvent(
    id: number,
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
      id: id,
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
  deleteEvent(id: number) {
    const uri = this.url + 'api/event/deleteevent';
    const token = localStorage.getItem('currentUser');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };
    const data = {
      id: id
    };
    return this.http.post<any>(uri, data, httpOptions).map(result => {
      return result;
    });
  }

  updateSchool(id: number, name: string, description: string) {
    const uri = this.url + 'api/location/addlocation';
    const token = localStorage.getItem('currentUser');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };

    const data = {
      id: id,
      name: name,
      description: description
    };
    return this.http.post<any>(uri, data, httpOptions).map(result => {
      return result;
    });
  }
  deleteSchool(id: number) {
    const uri = this.url + 'api/location/deletelocation';
    const token = localStorage.getItem('currentUser');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };
    const data = {
      id: id
    };
    return this.http.post<any>(uri, data, httpOptions).map(result => {
      return result;
    });
  }
  updatePoll(
    id: number,
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
      id: id,
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
  deletePoll(id: number) {
    const uri = this.url + 'api/question/deletequestion';
    const token = localStorage.getItem('currentUser');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };
    const data = {
      id: id
    };
    return this.http.post<any>(uri, data, httpOptions).map(result => {
      return result;
    });
  }
  deleteEventDeviceByEvent(eventId: number) {
    const uri = this.url + 'api/eventdevice/deletedevicebyevent';
    const token = localStorage.getItem('currentUser');
    const httpOptoin = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };
    let data = {
      eventId: eventId
    };
    return this.http.post<any>(uri, data, httpOptoin).map(result => {
      return result;
    });
  }
  updateManager(
    managerId: number,
    username: string,
    password: string,
    locationId: number
  ) {
    const uri = this.url + 'api/user/createManager';
    const token = localStorage.getItem('currentUser');
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };
    const data = {
      id: managerId,
      username: username,
      password: password,
      locationId: locationId
    };
    return this.http.post<any>(uri, data, httpOption).map(result => {
      return result;
    });
  }
  deleteManager(managerId: number) {
    const uri = this.url + 'api/user/changePass';
    const token = localStorage.getItem('currentUser');
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };
    const data = {
      id: managerId
    };
    return this.http.post<any>(uri, data, httpOption).map(result => {
      return result;
    });
  }
  changePass(password: string, newpassword: string) {
    const uri = this.url + 'api/user/changepass';
    const token = localStorage.getItem('currentUser');
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      })
    };
    const data = {
      pass: password,
      newPass: newpassword
    };
    return this.http.post<any>(uri, data, httpOption).map(result => {
      return result;
    });
  }
}
