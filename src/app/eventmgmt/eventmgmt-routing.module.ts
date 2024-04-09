import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { UpdateClientComponent } from './update-client/update-client.component';
import { ConfigComponent } from './config/config.component';
import { NgModule } from '@angular/core';
import { EventSetupComponent } from '../event-setup/event-setup.component';


export const routes: Routes = [
  { path: 'client-list', component: ListComponent },
  { path: 'update-client', component: UpdateClientComponent },
  {
    path: '', redirectTo: 'home', pathMatch: 'full',
  },
  {
    path: 'list/eventlist',
    component: ListComponent,
  }
  ,
  {
    path: "event-setup",
    component: EventSetupComponent
  },
  {

    path: 'config',
    component: ConfigComponent,
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventmgmtRoutingModule { }