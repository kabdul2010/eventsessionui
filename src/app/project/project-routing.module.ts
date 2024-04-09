import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { NgModule } from '@angular/core';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { EventSetupComponent } from '../event-setup/event-setup.component';


export const routes: Routes = [

  {
    path: "project-list",
    component: ProjectListComponent
  },
  
  {
    path: "create-project",
    component: CreateProjectComponent
  },
  {
    path: "update-project",
    component: UpdateProjectComponent
  },
  {
    path: "event-setup",
    component: EventSetupComponent
  }
  

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
