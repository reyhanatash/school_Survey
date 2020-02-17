import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { LoginComponent } from './login/login.component';
import { PollComponent } from './poll/poll.component';
import { SchoolComponent } from './school/school.component';
import { DeviceComponent } from './device/device.component';
import { EventComponent } from './event/event.component';
import { ManagerComponent } from './manager/manager.component';
import { UserComponent } from './user/user.component';
import { AuthGuard, sendtoHome, ManagerGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: 'category', component: CategoryComponent, canActivate: [AuthGuard] },
  { path: 'poll', component: PollComponent, canActivate: [AuthGuard] },
  { path: 'school', component: SchoolComponent, canActivate: [AuthGuard] },
  { path: 'device', component: DeviceComponent, canActivate: [AuthGuard] },
  { path: 'event', component: EventComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'manager', component: ManagerComponent, canActivate: [ManagerGuard] },

  { path: '', component: LoginComponent },
  { path: '**', redirectTo: '/', canActivate: [sendtoHome] }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
