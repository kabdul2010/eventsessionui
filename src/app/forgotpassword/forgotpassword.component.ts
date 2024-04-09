import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule, MatIcon, MatPrefix, MatLabel, MatFormField
  ],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm!: FormGroup;
  token: any;
  email: any;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute, private messageService: MessageService
  ) {

  }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]]
    });
  }

  forgotPassword(): void {
    if (this.forgotPasswordForm.get('email')?.invalid && this.forgotPasswordForm.get('email')?.touched) {
      return;
    }

    console.log(this.forgotPasswordForm.get('email')?.value);

    this.userService.forgotPassword(this.forgotPasswordForm.get('email')?.value).subscribe({
      next: (res) => {
        console.log(res);
        this.messageService.sendMessage('Password reset email sent successfully.', 'green');
      },
      error: (errorRes) => {
        if (errorRes.status === 404) {
          this.messageService.sendMessage('User not registered. Please register first.', 'red');
        } else {
          this.messageService.sendMessage('User not registered. Please register first.', 'red');
        }
        console.log(errorRes);
      }
    });
  }
}

