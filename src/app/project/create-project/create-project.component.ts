import { FormBuilder, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { MessageService } from '../../services/message.service';
import { NgFor, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-project',
   standalone: true,
   imports: [FormsModule, ReactiveFormsModule, NgIf, MatFormFieldModule, MatCardModule,NgFor,MatIcon,MatOption,MatSelectModule],
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  data:any[]=[];
  projectForm!: FormGroup;
  projectId!:number;

  constructor(private formBuilder: FormBuilder, private projectService: ProjectService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      clientName: [''],
      projectCost: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      projectHead: [''],
      rph: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      projectManager: [''],
      projectUsers: this.formBuilder.array([]), // Initialize projectUsers as an empty FormArray
      description: ['']
    });
    this.fetchData();
  }

  get projectUsers(): FormArray {
    return this.projectForm.get('projectUsers') as FormArray;
  }

  createProjectUserFormGroup(): FormGroup {
    return this.formBuilder.group({
      user: ['', Validators.required],
      department: ['']
    });
  }

  addProjectUser() {
   
    this.projectUsers.push(this.createProjectUserFormGroup());
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  clearForm() {
    this.projectForm.reset();
  }

  submitForm() {
    if (this.projectForm.valid) {
      this.projectService.create(this.projectForm.value).subscribe(
        () => {
          this.messageService.sendMessage('Project Details Added Successfully.', 'green');
          this.clearForm();
        },
        (error) => {
          const errorMessage = error.error && error.error.message ? error.error.message : 'Error';
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
        console.error('Error create project:', error);
        const errorMessage =
          error.error && error.error.message
            ? error.error.message
            : 'Error creating project.';
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
}



