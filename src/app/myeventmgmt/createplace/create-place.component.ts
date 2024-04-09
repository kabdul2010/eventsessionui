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
import { SessionService } from '../../services/session.service';


@Component({
  selector: 'app-create-project',
   standalone: true,
   imports: [FormsModule, ReactiveFormsModule, NgIf, MatFormFieldModule, MatCardModule,NgFor,MatIcon,MatOption,MatSelectModule],
  templateUrl: './create-place.component.html',
  styleUrls: ['./create-place.component.css']
})
export class CreatePlaceComponent implements OnInit {
  data:any[]=[];
  locationForm!: FormGroup;
  projectId!:number;
  eventId!:number;

  constructor(private route: ActivatedRoute,private formBuilder: FormBuilder, private sessionService: SessionService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.params['id'];
    console.log("eventId-gafffproposelocation------------>"+this.eventId)
    this.locationForm = this.formBuilder.group({
      placeName: ['', Validators.required],
     
      location: [''],
      eventId: this.eventId
    });
   
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
    this.locationForm.reset();
  }

  submitForm() {
    if (this.locationForm.valid) {
      this.sessionService.createPlacePropose(this.locationForm.value).subscribe(
        () => {
          this.messageService.sendMessage('Location Details Added Successfully.', 'green');
          this.clearForm();
        },
        (error) => {
          const errorMessage = error.error && error.error.message ? error.error.message : 'Error';
          this.messageService.sendMessage(errorMessage, 'red');
        }
      );
    } else {
      this.markFormGroupTouched(this.locationForm);
    }
  }
 
}



