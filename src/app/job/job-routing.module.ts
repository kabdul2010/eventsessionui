import { NgModule } from '@angular/core';
import { JobListComponent } from './job-list/job-list.component';
import { Route, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: "job-list",
    component: JobListComponent
  },

];

@NgModule({
  declarations: [],

    imports: [RouterModule.forChild(routes)],
     exports: [RouterModule]
})
export class JobRoutingModule { }
