import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    FormsModule,
    MatListModule,
    MatButtonModule,
    MatSelectModule,
    MatMenuModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatRippleModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {

  registrationForm!: FormGroup;
  fieldRequired: string = "This field is required"

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute, private messageService: MessageService
  ) { }


  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    this.registrationForm = this.formBuilder.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(emailregex)]],
      password: [null, [Validators.required, this.checkPassword]],
      confirmPassword: [null, [Validators.required, this.checkPassword]],
      roles: ['ROLE_USER'],
    });
  }


  emailErrors() {
    return this.registrationForm.get('email')!.hasError('required') ? 'This field is required' :
      this.registrationForm.get('email')!.hasError('pattern') ? 'Not a valid emailaddress' : ''
  }

  checkPassword(control: any) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  getErrorPassword() {
    return this.registrationForm.get('password')!.hasError('required') ? 'This field is required (The password must be at least six characters, one uppercase letter and one number)' :
      this.registrationForm.get('password')!.hasError('requirements') ? 'Password needs to be at least six characters, one uppercase letter and one number' : '';
  }

  checkValidation(input: string) {
    const validation = this.registrationForm.get(input)!.invalid && (this.registrationForm.get(input)!.dirty || this.registrationForm.get(input)!.touched)
    return validation;
  }

  onSubmit(formData: FormGroup, formDirective: FormGroupDirective): void {
    if (this.registrationForm.get('password')?.value == this.registrationForm.get('confirmPassword')?.value) {
      var user = new User(
        this.registrationForm.get('username')?.value,
        this.registrationForm.get('email')?.value,
        this.registrationForm.get('password')?.value,
        this.registrationForm.get('roles')?.value
      );
      this.userService.create(user)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.messageService.sendMessage('User Added successfully !', 'green');
            this.router.navigate(['./login']);
          },
          error: (errorRes) => {
            if (errorRes.status === 409) {
              this.messageService.sendMessage('User already registered with provided username or email', 'red');
            } else {
              this.messageService.sendMessage('An error occurred', 'red');
            }
            this.registrationForm.reset();
          }
        });
    } else {
      this.messageService.sendMessage('Password and confirm password do not match', 'red');
    }
  }

}
