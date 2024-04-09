import { ProjectUserEntity } from "./project-user-entity";

export class ProjectEntity {
  projectId!: number;
  projectName!: string;
  clientName!: string;
  projectCost!: number;
  projectHead!: string;
  rph!: number;
  projectManager!: string;
  projectUsers!: ProjectUserEntity[]; 
  description!: string;
}


