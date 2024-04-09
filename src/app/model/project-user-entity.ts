
import { ProjectEntity } from "./project-entity";



export class ProjectUserEntity {
    userId!: number;
    project!: ProjectEntity; 
    user!: string;
    department!: string;
}

