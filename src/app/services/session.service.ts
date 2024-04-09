import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEntity } from '../model/event-entity';
import { PlaceProposeEntity } from '../model/place-entity-propose';
import { EventDetailEntity } from '../model/event-detail-entity';
import { MyeventDetailEntity } from '../model/myevent-detail-entity';
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private baseUrl = "http://localhost:8080/user";
  private apiServer = "http://localhost:8080/user";

  constructor(private httpClient: HttpClient) { }


  createPlacePropose(placeProposeEntity: PlaceProposeEntity): Observable<PlaceProposeEntity> {
    const token = localStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token || ''
      })
    };

    console.log(token);
    console.log("proposeReq"+JSON.stringify(placeProposeEntity));

    return this.httpClient.post<PlaceProposeEntity>(this.apiServer + '/createPlacePropose', JSON.stringify(placeProposeEntity), httpOptions);
  }


  createProposePlace(placeProposeEntity: PlaceProposeEntity): Observable<PlaceProposeEntity> {
    const token = localStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token || ''
      })
    };

    console.log(token);
    console.log("proposeReq"+JSON.stringify(placeProposeEntity));

    return this.httpClient.post<PlaceProposeEntity>(this.apiServer + '/createProposeLoation', JSON.stringify(placeProposeEntity), httpOptions);
  }


  getPlaceList(): Observable<Object> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token || '',
      }),
    };

    return this.httpClient.get(
      this.apiServer + '/eventplacelist',
      httpOptions
    );
  }
 

  getSessionById(eventId: number): Observable<EventEntity> {
    const token = localStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token || ''
      })
    };

    return this.httpClient.get<EventEntity>(this.apiServer + '/events/' + eventId, httpOptions);
  }


  getMySessionById(eventId: number): Observable<MyeventDetailEntity> {
    const token = localStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token || ''
      })
    };

    return this.httpClient.get<MyeventDetailEntity>(this.apiServer + '/myeventdetail/' + eventId, httpOptions);
  }

  getSessionDetailsById(eventId: number): Observable<EventDetailEntity> {
    const token = localStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token || ''
      })
    };

    return this.httpClient.get<EventDetailEntity>(this.apiServer + '/eventdetails/' + eventId, httpOptions);
  }


  joinEvent(eventId: number): Observable<EventEntity> {
    const token = localStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token || ''
      })
    };

    return this.httpClient.get<EventEntity>(this.apiServer + '/joinevents/' + eventId, httpOptions);
  }


  endEvent(eventId: number): Observable<EventEntity> {
    const token = localStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token || ''
      })
    };

    return this.httpClient.get<EventEntity>(this.apiServer + '/endEvent/' + eventId, httpOptions);
  }
  getSessionList(): Observable<EventEntity[]> {
    const token = localStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token || ''
      })
    };

    console.log(token);
    return this.httpClient.get<EventEntity[]>(this.apiServer + '/eventlist', httpOptions);
  }


  getEndSessionList(): Observable<EventEntity[]> {
    const token = localStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token || ''
      })
    };

    console.log(token);
    return this.httpClient.get<EventEntity[]>(this.apiServer + '/endsessionlist', httpOptions);
  }

  //endsessionlist

  getMySessionList(): Observable<EventEntity[]> {
    const token = localStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token || ''
      })
    };

    console.log(token);
    return this.httpClient.get<EventEntity[]>(this.apiServer + '/mysessionlist', httpOptions);
  }

  getActiveSessionList(): Observable<EventEntity[]> {
    const token = localStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token || ''
      })
    };

    console.log(token);
    return this.httpClient.get<EventEntity[]>(this.apiServer + '/myactivesessionlist', httpOptions);
  }

 updateEvent(clientId: number, clientEntity: EventEntity): Observable<Object> {
    const token = localStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token || ''
      })
    };

    console.log(token);
    return this.httpClient.put<EventEntity>(this.apiServer + '/clients/' + clientId, clientEntity, httpOptions);
  }

  deleteEvent(clientId: number): Observable<Object> {
    const token = localStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token || ''
      })
    };

    return this.httpClient.delete(this.apiServer + '/clients/' + clientId, httpOptions);
  }

}
