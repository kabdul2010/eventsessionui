import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';
import { CommonModule } from '@angular/common';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    GoogleSigninButtonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  credentials = {
    username: '',
    password: ''
  }

  constructor(private loginService: LoginService, private router: Router, private messageService: MessageService) {
  }
  ngOnInit(): void {

  }

  onSubmit(): void {
    if ((this.credentials.username != '' && this.credentials.password != '') &&
      (this.credentials.username != null && this.credentials.password != null)) {
      console.log("this form has to be submitted to serve");
      this.loginService.generateToken(this.credentials).subscribe(
        (response: any) => {
          console.log(response.token);
          console.log(response.refreshToken);
          this.loginService.loginUser(response.token, response.refreshToken);
          window.location.href = "/activeeventmgmt/list/eventlist";
        },
        error => {
          if (error.status === 401) {
            this.messageService.sendMessage('Make sure your username and password are correct.', 'red');
          }
          if (error.status === 404) {
            this.messageService.sendMessage('Provided Username does not exist, Please Signup First.', 'red');
          }
        }
      );
    } else {
      this.messageService.sendMessage('Please enter a valid username and password', 'red');
    }
  }

  forgotPassword() {
    this.router.navigate(['./forgot-password']);
  }
}
