import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  standalone: true,
  imports: [NgClass],
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit, OnDestroy {
  message: string = '';
  color: string = '';
  private subscription!: Subscription;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.subscription = this.messageService.message$.subscribe(messageObject => {
      this.message = messageObject.text;
      this.color = messageObject.color;

      setTimeout(() => {
        this.clearMessage();
      }, 3000);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  clearMessage(): void {
    this.message = '';
    this.color = '';
  }
}

