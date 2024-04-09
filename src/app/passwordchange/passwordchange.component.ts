import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { User } from '../model/user';
import { CommonModule } from '@angular/common';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-passwordchange',
  standalone: true,
  imports: [ReactiveFormsModule,
    CommonModule],
  templateUrl: './passwordchange.component.html',
  styleUrl: './passwordchange.component.css'
})
export class PasswordChangeComponent {

  passwordChangeForm!: FormGroup;
  user!: User;
  token: any;
  email: any;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute, private messageService: MessageService
  ) {

  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'];
      this.email = params['email'];
      console.log(this.token + "/t" + this.email);
    });

    this.passwordChangeForm = this.fb.group({
      email: [this.email, Validators.required],
      password: ['', [Validators.required, this.checkPassword()]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator() });
  }

  checkPassword(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const enteredPassword = control.value;
      const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
      return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
    };
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');

      if (password && confirmPassword && password.value !== confirmPassword.value) {
        return { 'passwordMismatch': true };
      }

      return null;
    };
  }

  changePassword(): void {
    this.userService.passwordChange(this.token, this.passwordChangeForm.get('password')?.value).subscribe({
      next: (res) => {
        console.log(res);
        this.messageService.sendMessage('Password changed successfully.', 'green');
        this.router.navigate(['./login']);
      },
      error: (errorRes) => {
        console.log(errorRes);
        this.messageService.sendMessage('An error occurred while changing password. Please try again later.', 'red');
      }
    });
  }

}
