import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import {
  CreatorService,
  SelectorService,
  ModifiedService
} from '../_services/index';
import * as demo from '../../assets/js/demo.js';
import * as $ from 'jquery';
import { Subject } from 'rxjs';
import * as alertify from '../../scripts/alertify.min';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  question: string[];
  viewResult: boolean = false;
  chart = [];
  eventList;
  toggleResult='';
  togglecanvase ='';
  show ='';
  dtTrigger = new Subject();
  eventName: string = '';
  constructor(
    private creatorService: CreatorService,
    private selectorService: SelectorService,
    private modifiedService: ModifiedService
  ) {}

  ngOnInit() {
   
    this.dtTrigger.unsubscribe();
    this.dtTrigger = new Subject();
    $('.imgLogo-part').css('display','none');
    var height = $(window).height();
  


    this.selectorService.managerEvent().subscribe(
      data => {
        this.eventList = data['data'];
        this.dtTrigger.next();
      },
      error => {}
    );

  
    
  }

  checkEvent(index) {
    let event = this.eventList[index];
    let startDate = new Date(event.startDate);
    let endDate = new Date(event.endDate);
    let now = new Date(Date.now());
    if (now >= startDate && now < endDate) {
      return true;
    }
    return false;
  }
  showChart(index) {
    let id = this.eventList[index]['id'];
    this.eventName = this.eventList[index]['name'];
    this.selectorService.getResult(id).subscribe(
      data => {
        this.question = data['data'];

        this.viewResult = true;
        setTimeout(() => {
          for (let i = 0; i < this.question.length; i++) {
            let res = [];
            res.push(this.question[i][`ANSWER1`]);
            res.push(this.question[i][`ANSWER2`]);
            res.push(this.question[i][`ANSWER3`]);
            res.push(this.question[i][`ANSWER4`]);
            res.push(this.question[i][`ANSWER5`]);

            this.chart[i] = new Chart(`canvase${i}`, this.buildchart(res));
          }
        }, 0);
      },
      error => {}
    );
  }

 

  buildchart(data) {
    return {
      type: 'bar',
      data: {
        labels: ['Excellent', 'Good', 'Fair', 'poor', 'Very Poor'],
        datasets: [
          {
            label: ['poll'],
            data: data,
            backgroundColor: [
              'rgba(182,135,245, 0.7)',
              'rgba(174,21,250, 0.7)',
              'rgba(102,100,219, 0.7)',
              'rgba(78,108,251, 0.7)',
              'rgba(21,59,250, 0.7)'
            ],
            borderColor: [
              'rgba(182,135,245, 0.7)',
              'rgba(137,135,245, 0.7)',
              'rgba(102,100,219, 0.7)',
              'rgba(78,108,251, 0.7)',
              'rgba(78,108,251, 0.7)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    };
  }

  showCanvase(id)
  {
    this.togglecanvase=id;

    setTimeout(() => {

        let res = [];
        res.push(this.question[id][`ANSWER1`]);
        res.push(this.question[id][`ANSWER2`]);
        res.push(this.question[id][`ANSWER3`]);
        res.push(this.question[id][`ANSWER4`]);
        res.push(this.question[id][`ANSWER5`]);

        this.chart[id] = new Chart(`canvase${id}`, this.buildchart(res));

    }, 0);

  }


 
 

 
}
