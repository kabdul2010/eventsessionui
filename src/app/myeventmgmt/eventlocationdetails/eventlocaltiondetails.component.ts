import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { ClientEntity } from '../../model/client-entity';
import { MatCardModule } from '@angular/material/card';
import { EventEntity } from '../../model/event-entity';
import { SessionService } from '../../services/session.service';
import { EventDetailEntity } from '../../model/event-detail-entity';
import { PlaceProposeEntity } from '../../model/place-entity-propose';


@Component({
  selector: 'app-eventdetails',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './eventlocationdetails.component.html',
  styleUrl: './eventlocationdetails.component.css'
})
export class EventlocationdetailsComponent implements OnInit {
  eventId!: number
  eventEntity!: EventDetailEntity
  proposals!: any
  constructor(private route: ActivatedRoute, private sessionService: SessionService, private router: Router) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.params['id'];
    console.log("eventId-gafff------------>"+this.eventId)
    this.eventEntity = new EventDetailEntity();
    this.sessionService.getSessionDetailsById(this.eventId).subscribe(data => {
      this.eventEntity = data;
      this.proposals = data.proposals;
      console.log("eentName:detailssssss:"+this.eventEntity.eventname);
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

  endSession(eventId: number) {

    console.log("ending session:::::::::"+eventId);
    this.sessionService.endEvent(eventId).subscribe(data => {
      console.log(data);
      console.log("in proposelocation ---gaff" + eventId);
     // this.router.navigate(['propose-location-details', eventId]);
      this.router.navigate(['eventmgmt/list/eventlist']);

    });
  
  }
  

}
