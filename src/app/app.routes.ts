import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { RegistrationComponent } from './registration/registration.component';
import { authGuard } from './auth.guard';

import { PasswordChangeComponent } from './passwordchange/passwordchange.component';
import { ForgotPasswordComponent } from './forgotpassword/forgotpassword.component';

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
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  
  {
    path: 'register',
    component: RegistrationComponent
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
  path:'project/list/eventSetup',
  component:EventSetupComponent,
 }





];
