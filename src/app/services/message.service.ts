import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSource = new Subject<any>();
  message$ = this.messageSource.asObservable();

  constructor() { }

  sendMessage(message: string, color: string) {
    this.messageSource.next({ text: message, color: color });
  }

}
