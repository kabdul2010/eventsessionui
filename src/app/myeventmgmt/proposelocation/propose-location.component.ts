import { FormBuilder, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from '../../services/message.service';
import { NgFor, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
@Component({
  selector: 'app-propose-location',
   standalone: true,
   imports: [FormsModule, ReactiveFormsModule, NgIf, MatFormFieldModule, MatCardModule,NgFor,MatIcon,MatOption,MatSelectModule],
  templateUrl: './propose-location.component.html',
  styleUrls: ['./propose-location.component.css']
})
export class ProposeLocationComponent implements OnInit {
  data:any[]=[];
  proposeLocationForm!: FormGroup;
  eventId!:number;

  constructor(private router: Router,private route: ActivatedRoute,private formBuilder: FormBuilder, private sessionService: SessionService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.params['id'];
    console.log("eventId-gafffproposelocation------------>"+this.eventId)
    this.proposeLocationForm = this.formBuilder.group({
      placeName: [''],
      eventId : this.eventId
    });
    this.fetchData();
  }

  get projectUsers(): FormArray {
    return this.proposeLocationForm.get('projectUsers') as FormArray;
  }

  createProjectUserFormGroup(): FormGroup {
    return this.formBuilder.group({
      user: ['', Validators.required],
      department: ['']
    });
  }

  

  createNewPlace(eventId: number) {

       console.log("new restaurant session:::::::::"+eventId);
   
      this.router.navigate(['create-place', eventId]);

  
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
    this.proposeLocationForm.reset();
  }

  submitForm() {
    console.log("proposesubmit::::"+this.proposeLocationForm.valid);
    if (this.proposeLocationForm.valid) {
      this.sessionService.createProposePlace(this.proposeLocationForm.value).subscribe(
        () => {
          this.messageService.sendMessage('Proposed Details Added Successfully.', 'green');
          this.clearForm();
          this.router.navigate(['event-location-details', this.eventId]);

        },
        (error) => {
          const errorMessage = error.error && error.error.message ? error.error.message : 'Error while submit';
          this.messageService.sendMessage(errorMessage, 'red');
        }
      );
    } else {
      this.markFormGroupTouched(this.proposeLocationForm);
    }
  }
  fetchData(): void {
    this.sessionService.getPlaceList().subscribe(
      (response: any) => {
        this.data = response.map((item: { id: any; placeName: any; }) => {
          return {key: item.id, value: item.placeName}
        });
        console.log(this.data);
      },
      (error) => {
        console.error('Error create proposed location:', error);
        const errorMessage =
          error.error && error.error.message
            ? error.error.message
            : 'Error creating place.';
        this.messageService.sendMessage(errorMessage, 'red');
      }
    );
  }

  removeLastProjectUser() {
    const projectUsers = this.proposeLocationForm.get('projectUsers') as FormArray;
    if (projectUsers.length > 0) {
        projectUsers.removeAt(projectUsers.length - 1);
    }
}


}



