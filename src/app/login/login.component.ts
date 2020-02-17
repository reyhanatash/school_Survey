import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as alertify from '../../scripts/alertify.min';
import { AlertService, AuthenticationService } from '../_services/index';
import '../../assets/js/main.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    $('body').addClass('login-background');
    $('.imgLogo-part').css('display','none');
    $(document).ready(function() {
      $('#example').DataTable();
  } );
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'] || '/category';
    this.checktoken();
  }
  checktoken() {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/category']);
    }
  }
  login() {
    if (!this.model.username && !this.model.password) {
      alertify.error('Please enter your user name and password ');
      return;
    }
    this.loading = true;
    this.authenticationService
      .login(this.model.username, this.model.password)
      .subscribe(
        data => {
          if (data['data'].type === 1) {
            $('body').removeClass('login-background');
            this.router.navigate(['/category']);
            $('.imgLogo-part').css('display','block');
          } else if (data['data'].type === 2) {
            $('body').removeClass('login-background');
            this.router.navigate(['/manager']);
            $('.imgLogo-part').css('display','none');
          } else {
            alertify.error('invalid username or password');
          }

          localStorage.setItem('userName', this.model.username);
        },
        error => {
          this.alertService.error(error.error.error_description);
          this.loading = false;
        }
      );
  }
}
