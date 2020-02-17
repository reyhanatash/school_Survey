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
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit, OnDestroy {
  model: any = {};
  categorise;
  selectedCategory;
  dtTrigger = new Subject();
  isupdate: boolean = false;
  selectedQuestion;
  questionList;
  question;
  category;
  answer1;
  answer2;
  answer3;
  answer4;
  answer5;
  description;
  constructor(
    private creatorService: CreatorService,
    private selectorService: SelectorService,
    private modifiedService: ModifiedService
  ) {}

  ngOnInit() {
    this.selectorService.selectAllCategory().subscribe(data => {
      this.categorise = data['data'];
      console.log(data['data']);
      $('body').addClass('user-background');
    });
    this.getAllPoll();
  }
  getAllPoll() {
    this.dtTrigger.unsubscribe();
    this.dtTrigger = new Subject();
    this.selectorService.selectAllQuestions().subscribe(
      data => {
        this.questionList = data['data'];
        this.dtTrigger.next();
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  createQuestion() {
    this.model.categoryId = this.selectedCategory['FLD_PK_CATEGORY_CO'];
    this.creatorService
      .CreatePoll(
        this.model.question,
        this.model.description,
        this.model.categoryId,
        this.model.answer1,
        this.model.answer2,
        this.model.answer3,
        this.model.answer4,
        this.model.answer5
      )
      .subscribe(data => {
        if (data['status'] === 200) {
          alertify.success('success');
          this.cancel();
          this.getAllPoll();
          return;
        }
        alertify.error('error');
      }),
      error => {
        alertify.error('error');
        console.log(error);
      };
  }
  detailQue(index) {
    let question = this.questionList[index];
    this.question = question['question'];
    this.description = question['description'];
    this.category = question['categoryName'];
    this.answer1 = question['answer1'];
    this.answer2 = question['answer2'];
    this.answer3 = question['answer3'];
    this.answer4 = question['answer4'];
    this.answer5 = question['answer5'];
  }
  deleteQue(index) {
    let id = this.questionList[index]['id'];
   
    alertify.confirm(
      alertify.defaults.glossary.title = 'QuestionDeleteAlert',
      'Are You Sure Delete This Question?',
      () => {
        this.modifiedService.deletePoll(id).subscribe(
          data => {
            if (data['status'] === 200) {
              alertify.success('success');
              this.getAllPoll();
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
  editQue(index) {
    this.isupdate = true;
    let question = this.questionList[index];
    this.selectedQuestion = this.questionList[index];
    this.model.question = question['question'];
    this.model.description = question['description'];
    this.selectedCategory = this.categorise.filter(
      x => x['FLD_PK_CATEGORY_CO'] == question['categoryid']
    )[0];
    this.model.answer1 = question['answer1'];
    this.model.answer2 = question['answer2'];
    this.model.answer3 = question['answer3'];
    this.model.answer4 = question['answer4'];
    this.model.answer5 = question['answer5'];
  }
  editQueClick() {
    let id = this.selectedQuestion['id'];
    this.model.categoryId = this.selectedCategory['FLD_PK_CATEGORY_CO'];
    this.modifiedService
      .updatePoll(
        id,
        this.model.question,
        this.model.description,
        this.model.categoryId,
        this.model.answer1,
        this.model.answer2,
        this.model.answer3,
        this.model.answer4,
        this.model.answer5
      )
      .subscribe(data => {
        if (data['status'] === 200) {
          alertify.success('success');
          this.cancel();
          this.getAllPoll();
          return;
        }
        alertify.error('error');
      }),
      error => {
        alertify.error('error');
        console.log(error);
      };
  }
  cancel() {
    this.isupdate = false;
    this.model.question = '';
    this.model.description = '';
    this.selectedCategory = '';
    this.model.answer1 = '';
    this.model.answer2 = '';
    this.model.answer3 = '';
    this.model.answer4 = '';
    this.model.answer5 = '';
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
