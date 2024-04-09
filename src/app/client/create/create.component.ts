import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MessageService } from '../../services/message.service';


@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, MatFormFieldModule, MatCardModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {


  clientForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private clientService: ClientService,
    private messageService: MessageService,) { };

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      clientName: ['', Validators.required],
      currency: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: [''],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required],
      industry: ['', Validators.required],
      companySize: ['', Validators.required],
      description: ['']
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
    this.clientForm.reset();
  }


  submitForm() {
    if (this.clientForm.valid) {
      this.clientService.create(this.clientForm.value).subscribe(
        () => {
          this.messageService.sendMessage('Client Details Added Successfully.', 'green');
          this.clearForm();
        },
        (error) => {
          const errorMessage = error.error && error.error.message ? error.error.message : 'Error';
          this.messageService.sendMessage(errorMessage, 'red');
        }
      );
    } else {
      this.markFormGroupTouched(this.clientForm);
    }
  }
}
