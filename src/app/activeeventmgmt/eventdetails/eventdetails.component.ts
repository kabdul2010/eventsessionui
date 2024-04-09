import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { ClientEntity } from '../../model/client-entity';
import { MatCardModule } from '@angular/material/card';
import { EventEntity } from '../../model/event-entity';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-eventdetails',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './eventdetails.component.html',
  styleUrl: './eventdetails.component.css'
})
export class EventdetailsComponent implements OnInit {
  eventId!: number
  eventEntity!: EventEntity
  constructor(private route: ActivatedRoute, private sessionService: SessionService, private router: Router) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.params['id'];
    console.log("eventId-gafff------------>"+this.eventId)
    this.eventEntity = new EventEntity();
    this.sessionService.getSessionById(this.eventId).subscribe(data => {
      this.eventEntity = data;
      console.log("eentName::"+this.eventEntity.eventname);
    });
  }

  goBack() {
    this.router.navigate(['eventmgmt/list/eventlist']);
  }


  joinEvent(eventId: number) {

    console.log("joining session:::::::::"+eventId);
    this.sessionService.joinEvent(eventId).subscribe(data => {
      console.log(data);
      console.log("in proposelocation ---gaff" + eventId);
      this.router.navigate(['propose-location-details', eventId]);

    });
  
  }

}
