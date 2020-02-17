import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import * as alertify from '../../scripts/alertify.min';
import * as sha256 from 'sha256/lib/sha256.js';
import { ModifiedService } from '../_services/index';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'School Poll';
  pass = '';
  cNewPass = '';
  newPass = '';
  constructor(
    private globals: Globals,
    private modifiedService: ModifiedService
  ) {}
  userName = this.globals.userName;
  ngOnInit() {
    $('.sidebar-dropdown > a').click(function() {
      $('.sidebar-submenu').slideUp(200);
      if (
        $(this)
          .parent()
          .hasClass('active')
      ) {
        $('.sidebar-dropdown').removeClass('active');
        $(this)
          .parent()
          .removeClass('active');
      } else {
        $('.sidebar-dropdown').removeClass('active');
        $(this)
          .next('.sidebar-submenu')
          .slideDown(200);
        $(this)
          .parent()
          .addClass('active');
      }
    });

    $('#close-sidebar').click(function() {
      $('.page-wrapper').removeClass('toggled');
      $('.container').removeClass('wrapper-content');
    });
    $('#show-sidebar').click(function() {
      $('.page-wrapper').addClass('toggled');
      $('page-wrapper.toggled').css('padding-left', '300px');
      $('.container').addClass('wrapper-content');
    });

    $(function() {
      $('.sidebar a').click(function() {
        $('.sidebar a').removeClass('active');
        $('.page-wrapper').removeClass('toggled');
        $('.container').removeClass('wrapper-content');

        $(this).addClass('active');
      });
    });
  }
  changePass() {
    if (this.cNewPass && this.pass && this.newPass) {
      if (this.cNewPass === this.newPass) {
        this.modifiedService
          .changePass(sha256(this.pass), sha256(this.newPass))
          .subscribe(
            data => {
              if (data['data'][0]['message'] === 'succeed') {
                alertify.success('success');
              } else if (data['data'][0]['message'] === 'invalid password') {
                alertify.error('invalid password');
              }
            },
            error => {
              alertify.success('error');
            }
          );
      } else {
        alertify.error("Password and Confirm Password don't match");
      }
    } else {
      alertify.error('All Field is Requierd');
    }
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    $('body').removeClass('user-background');
  }
}
