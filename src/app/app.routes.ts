import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './client/dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { authGuard } from './auth.guard';
import { ClientdetailsComponent } from './client/clientdetails/clientdetails.component';
import { PasswordChangeComponent } from './passwordchange/passwordchange.component';
import { ForgotPasswordComponent } from './forgotpassword/forgotpassword.component';
import { ProjectDetailsComponent } from './project/project-details/project-details.component';
import { CreateProjectComponent } from './project/create-project/create-project.component';
import { EventSetupComponent } from './event-setup/event-setup.component';
import { EventdetailsComponent } from './eventmgmt/eventdetails/eventdetails.component';
import { ProposeLocationComponent } from './eventmgmt/proposelocation/propose-location.component';
import { CreatePlaceComponent } from './eventmgmt/createplace/create-place.component';
import { EventlocationdetailsComponent } from './eventmgmt/eventlocationdetails/eventlocaltiondetails.component';
import { EventenddetailsComponent } from './eventmgmt/eventenddetails/eventenddetails.component';
import { MyeventdetailsComponent } from './myeventmgmt/myeventdetails/myeventdetails.component';
import { EventviewlocationdetailsComponent } from './eventmgmt/eventviewlocationdetails/eventviewlocaltiondetails.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/client',
    pathMatch: 'full',
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    pathMatch: "full",
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'client',
    loadChildren: () =>
      import('./client/client.module').then((m) => m.ClientModule),
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'client-details/:id',
    component: ClientdetailsComponent
  },
  {
    path: 'event-details/:id',
    component: EventdetailsComponent
  },{
    path: 'myevent-details/:id',
    component: MyeventdetailsComponent
  }
  ,
  {
    path: 'event-end-details/:id',
    component: EventenddetailsComponent
  },

  
  
  {
    path: 'propose-location-details/:id',
    component: ProposeLocationComponent
  },
  {
    path: 'event-location-details/:id',
    component: EventlocationdetailsComponent
  },
  {
    path: 'event-viewlocation-details/:id',
    component: EventviewlocationdetailsComponent
  },
  {
    path: 'create-place/:id',
    component: CreatePlaceComponent
  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'password-change', component: PasswordChangeComponent },

  // {
  //   path: '',
  //   redirectTo: '/project',
  //   pathMatch: 'full',
  // },

  {
    path: 'project',
    loadChildren: () =>
      import('./project/project.module').then((m) => m.ProjectModule),
  },

  
  {
    path: 'eventmgmt',
    loadChildren: () =>
      import('./eventmgmt/eventmgmt.module').then((m) => m.EventmgmtModule),
  },
  {
    path: 'activeeventmgmt',
    loadChildren: () =>
      import('./activeeventmgmt/activeeventmgmt.module').then((m) => m.ActiveeventmgmtModule),
  },{
    path: 'myeventmgmt',
    loadChildren: () =>
      import('./myeventmgmt/myeventmgmt.module').then((m) => m.MyeventmgmtModule),
  },
  {
    path: 'project-details/:id',
    component: ProjectDetailsComponent
  },

 {
  path:'project/list/addProject',
  component:CreateProjectComponent,
 },
 {
  path:'project/list/eventSetup',
  component:EventSetupComponent,
 },
 {
  path: 'job',
  loadChildren: () =>
    import('./job/job.module').then((m) => m.JobModule),
},





];
