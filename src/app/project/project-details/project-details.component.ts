import { Component, OnInit } from '@angular/core';
import { ProjectEntity } from '../../model/project-entity';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [MatCardModule, NgFor, NgIf],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent implements OnInit {

  projectId!: number;
  projectEntity!: ProjectEntity;

  constructor(private route: ActivatedRoute, private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params['id'];
    console.log(this.projectId);
    this.projectEntity = new ProjectEntity();
    this.projectService.getProjectById(this.projectId).subscribe(data => {
      this.projectEntity = data;
      console.log(data);
    });
  }

  goBack() {
    this.router.navigate(['project/project-list']);
  }

}
