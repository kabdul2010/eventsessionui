import { FormBuilder, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { MessageService } from '../services/message.service';
import { NgFor, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Component, OnInit } from '@angular/core';
import { EventsetupService } from '../eventsetup.service';

@Component({
  selector: 'app-event-setup',
   standalone: true,
   imports: [FormsModule, ReactiveFormsModule, NgIf, MatFormFieldModule, MatCardModule,NgFor,MatIcon,MatOption,MatSelectModule],
  templateUrl: './event-setup.component.html',
  styleUrls: ['./event-setup.component.css']
})
export class EventSetupComponent implements OnInit {
  data:any[]=[];
  sessionForm!: FormGroup;
  eventId!:number;

  constructor(private formBuilder: FormBuilder,private eventSetupService: EventsetupService, private projectService: ProjectService, private messageService: MessageService) { }

  ngOnInit(): void {
    console.log("userGGGGG"+localStorage.getItem('loggedinUser'));
    this.sessionForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      sessionUsers: this.formBuilder.array([]), // Initialize invitees as an empty FormArray
      description: [''],
      organizedBy:localStorage.getItem('token')
    });
   
  }

  get sessionUsers(): FormArray {
    return this.sessionForm.get('sessionUsers') as FormArray;
  }

  createInviteUserFormGroup(): FormGroup {
    return this.formBuilder.group({
      user: ['', Validators.required]
    });
  }

  addUsersToSession() {
    console.log("data Users:::"+this.createInviteUserFormGroup());
    this.sessionUsers.push(this.createInviteUserFormGroup());
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
    this.sessionForm.reset();
  }

  submitForm() {
        this.eventSetupService.createSession(this.sessionForm.value).subscribe(
        () => {
          this.messageService.sendMessage('Event Setup Added Successfully.', 'green');
          this.clearForm();
        },
        (error) => {
          const errorMessage = error.error && error.error.message ? error.error.message : 'Error';
          this.messageService.sendMessage(errorMessage, 'red');
        }
      );
  /*  } else {
      this.markFormGroupTouched(this.projectForm);
    }*/
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
        console.error('Error create session:', error);
        const errorMessage =
          error.error && error.error.message
            ? error.error.message
            : 'Error creating session.';
        this.messageService.sendMessage(errorMessage, 'red');
      }
    );
  }

  removeLastSessionUser() {
    const sessionUsers = this.sessionForm.get('sessionUsers') as FormArray;
    if (sessionUsers.length > 0) {
      sessionUsers.removeAt(sessionUsers.length - 1);
    }
}
}



