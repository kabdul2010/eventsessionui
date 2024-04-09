import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { UpdateClientComponent } from './update-client/update-client.component';
import { ConfigComponent } from './config/config.component';
import { CreateComponent } from './create/create.component';
import { NgModule } from '@angular/core';


export const routes: Routes = [
  { path: 'client-list', component: ListComponent },
  { path: 'update-client', component: UpdateClientComponent },
  {
    path: '', redirectTo: 'home', pathMatch: 'full',
  },
  {
    path: 'list',
    component: ListComponent,
  },
  {

    path: 'config',
    component: ConfigComponent,
  },
  {
    path: 'list/addClient',
    component: CreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }