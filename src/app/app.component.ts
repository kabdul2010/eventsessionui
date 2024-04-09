import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { LoginService } from './services/login.service';
import { MatFormFieldModule, MatPrefix } from '@angular/material/form-field';
import { PopupComponent } from './popup/popup.component';
import { Subscription } from 'rxjs';
import { IdleService } from './services/idle.service';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    PopupComponent,
    CommonModule,
    RouterOutlet,
    RouterModule,
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
  ],

})
export class AppComponent implements OnInit, OnDestroy {
  private idleSubscription?: Subscription;
  public loggedIn = false;
  public loggedUserRecord:any="";
  constructor(private loginService: LoginService, private router: Router, private idleService: IdleService) { }

  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      this.loggedIn = true;
      console.log(this.loggedIn);

      let sessionExpired = false;

      this.idleSubscription = this.idleService.idleState.subscribe((isIdle) => {
        if (isIdle && !sessionExpired) {
          console.log("user is idle");
          const confirmSession = confirm('Your session will expire in 2 minute. Do you want to continue?');
          if (!confirmSession) {
            sessionExpired = true;
            setTimeout(() => {
              if (sessionExpired) {
                localStorage.clear();
                this.logoutUser();
                window.location.reload();
              }
            }, 120000);
          } else {
            this.refreshToken();
          }
        } else {
         // console.log("user is active");
        }
      });
      this.loggedUserRecord=this.getLoggedUser();
      console.log("loggedUSerRRR"+this.loggedUserRecord);
    } else {
    }
  }

  refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return;
    }

    fetch('http://localhost:8080/user/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        refreshToken: refreshToken
      })
    }).then(async response => {
      if (response.ok) {
        console.log('Token refreshed successfully');
        const data = await response.json();

        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
      } else {
        console.error('Error refreshing token:', response.statusText);
      }
    }).catch(error => {
      console.error('Error refreshing token:', error);
    });
  }

  ngOnDestroy(): void {
    if (this.idleSubscription) {
      this.idleSubscription.unsubscribe();
    }
  }

  logoutUser() {
    this.loginService.logout();
    this.router.navigateByUrl('login').then(() => {
      window.location.reload();
    });
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  getLoggedUser(): string {
    return this.loginService.getLoggedUser();
  }
  
  goToHome(): void {
    if (this.isLoggedIn()) {
      this.router.navigate(['./client/client-list']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:click', ['$event'])
  @HostListener('document:keypress', ['$event'])
  onUserAction(event: MouseEvent | KeyboardEvent) {
    this.idleService.resetTimer();
  }

  title = 'event-decision-maker';
  opened = true;
}