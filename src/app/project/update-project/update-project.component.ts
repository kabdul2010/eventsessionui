import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { MessageService } from '../../services/message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule
  ],
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css'],
})
export class UpdateProjectComponent implements OnInit {
  data: any[] = [];
  projectForm!: FormGroup;
  projectId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      clientName: [''],
      projectCost: ['', [Validators.pattern('^[0-9]+$')]],
      projectHead: [''],
      rph: ['', [Validators.pattern('^[0-9]+$')]],
      projectManager: [''],
      projectUsers: this.formBuilder.array([]),
      description: [''],
    });

    this.route.params.subscribe((params) => {
      if (params['project']) {
        const projectPayload = JSON.parse(params['project']);
        this.projectId = projectPayload.projectId;

        this.projectForm.patchValue({
          projectName: projectPayload.projectName,
          clientName: projectPayload.clientName,
          projectCost: projectPayload.projectCost,
          projectHead: projectPayload.projectHead,
          rph: projectPayload.rph,
          projectManager: projectPayload.projectManager,
          description: projectPayload.description,
        });

        if (
          projectPayload.projectUsers &&
          projectPayload.projectUsers.length > 0
        ) {
          const usersArray = this.projectForm.get('projectUsers') as FormArray;
          projectPayload.projectUsers.forEach((user: any) => {
            usersArray.push(
              this.formBuilder.group({
                user: [user.user],
                department: [user.department],
              })
            );
          });
        }

        this.projectId = projectPayload.projectId;
        console.log(projectPayload.projectId);
      }
    });

    this.fetchData();
  }

  get projectUsers(): FormArray {
    return this.projectForm.get('projectUsers') as FormArray;
  }

  updateProjectUserFormGroup(): FormGroup {
    return this.formBuilder.group({
      user: ['', Validators.required],
      department: [''],
    });
  }

  updateProjectUser() {
    this.projectUsers.push(this.updateProjectUserFormGroup());
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  clearForm() {
    this.projectForm.reset();
  }

  submitForm(): void {
    if (this.projectForm?.valid) {
      console.log(this.projectId);
      console.log(this.projectForm.value);

      this.projectService
        .updateProject(this.projectId, this.projectForm.value)
        .subscribe(
          (response) => {
            console.log('Project updated successfully:', response);
            this.messageService.sendMessage(
              'Project Updated Successfully.',
              'green'
            );
            this.router.navigate(['/project/project-list']);
          },
          (error) => {
            console.error('Error updating project:', error);
            const errorMessage =
              error.error && error.error.message
                ? error.error.message
                : 'Error updating project.';
            this.messageService.sendMessage(errorMessage, 'red');
          }
        );
    } else {
      this.markFormGroupTouched(this.projectForm);
    }
  }

  fetchData(): void {
    this.projectService.getClient().subscribe(
      (response: any) => {
        this.data = response.map((item: { clientId: any; clientName: any; }) => {
          return {key: item.clientId, value: item.clientName}
        });
        console.log(this.data);
      },
      (error) => {
        console.error('Error updating project:', error);
        const errorMessage =
          error.error && error.error.message
            ? error.error.message
            : 'Error updating project.';
        this.messageService.sendMessage(errorMessage, 'red');
      }
    );
    
  }
  removeLastProjectUser() {
    const projectUsers = this.projectForm.get('projectUsers') as FormArray;
    if (projectUsers.length > 0) {
        projectUsers.removeAt(projectUsers.length - 1);
    }
}
  goBack() {
    this.router.navigate(['project/project-list']);
  }
}
