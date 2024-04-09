import { Component, OnInit } from '@angular/core';
import { ClientEntity } from '../../model/client-entity';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MessageService } from '../../services/message.service';

@Component({
  standalone: true,
  selector: 'app-update-client',
  imports: [RouterOutlet, FormsModule, CommonModule, ReactiveFormsModule, MatCardModule],
  templateUrl: './update-client.component.html',
  styleUrl: './update-client.component.css'
})
export class UpdateClientComponent implements OnInit {
  clientForm!: FormGroup;
  clientId!: number;
  clientEntity: ClientEntity = new ClientEntity();
  constructor(private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router, private formBuilder: FormBuilder, private messageService: MessageService) {
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

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['client']) {
        const client = JSON.parse(params['client']) as ClientEntity;
        this.clientId = client.clientId;
        this.clientForm.setValue(
          {
            clientName: client.clientName,
            currency: client.currency,
            emailId: client.emailId,
            firstName: client.firstName,
            lastName: client.lastName,
            phone: client.phone,
            mobile: client.mobile,
            streetAddress: client.streetAddress,
            city: client.city,
            state: client.state,
            zip: client.zip,
            country: client.country,
            industry: client.industry,
            companySize: client.companySize,
            description: client.description

          }
        );
      }
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

  submitForm(): void {
    if (this.clientForm?.valid) {
      console.log(this.clientId);
      console.log(this.clientForm.value);

      this.clientService.updateClient(this.clientId, this.clientForm.value).subscribe(
        (response) => {
          console.log('Client updated successfully:', response);
          this.messageService.sendMessage('Client Updated Successfully.', 'green');
          this.router.navigate(['/client/client-list']);
        },
        (error) => {
          console.error('Error updating client:', error);
          const errorMessage = error.error && error.error.message ? error.error.message : 'Error updating client.';
          this.messageService.sendMessage(errorMessage, 'red');
        }
      );
    } else {
      this.markFormGroupTouched(this.clientForm);
    }
  }



  goBack() {
    this.router.navigate(['client/client-list']);
  }

}
