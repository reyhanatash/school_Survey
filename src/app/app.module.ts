import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CategoryComponent } from './category/category.component';
import { EventComponent } from './event/event.component';
import { PollComponent } from './poll/poll.component';
import { SchoolComponent } from './school/school.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { DeviceComponent } from './device/device.component';
import { Globals } from './globals';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard, ManagerGuard } from './_guards/auth.guard';
import {
  AlertService,
  AuthenticationService,
  CreatorService,
  SelectorService,
  ModifiedService
} from './_services/index';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ManagerComponent } from './manager/manager.component';
import { UserComponent } from './user/user.component';
import { ManagerNavbarComponent } from './manager-navbar/manager-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CategoryComponent,
    EventComponent,
    PollComponent,
    SchoolComponent,
    NavbarComponent,
    DeviceComponent,
    ManagerComponent,
    UserComponent,
    ManagerNavbarComponent
  ],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [
    AuthGuard,
    ManagerGuard,
    AlertService,
    AuthenticationService,
    CreatorService,
    SelectorService,
    ModifiedService,
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
