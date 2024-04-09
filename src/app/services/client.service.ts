import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClientEntity } from '../model/client-entity';
import { EventEntity } from '../model/event-entity';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = "http://localhost:8080/user";
  private apiServer = "http://localhost:8080/api/v1";

  constructor(private httpClient: HttpClient) { }

  checkMobileExists(mobile: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.apiServer}/check-mobile/${mobile}`);
  }

  create(ClientEntity: ClientEntity): Observable<ClientEntity> {
    const token = localStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token || ''
      })
    };

    console.log(token);
    console.log(JSON.stringify(ClientEntity));

    return this.httpClient.post<ClientEntity>(this.apiServer + '/clients', JSON.stringify(ClientEntity), httpOptions);
  }

  getClientById(eventId: number): Observable<ClientEntity> {
    const token = localStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token || ''
      })
    };

    return this.httpClient.get<ClientEntity>(this.apiServer + '/events/' + eventId, httpOptions);
  }

  getClientsList(): Observable<ClientEntity[]> {
    const token = localStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token || ''
      })
    };

    console.log(token);
    return this.httpClient.get<ClientEntity[]>(this.apiServer + '/clients', httpOptions);
  }

  updateClient(clientId: number, clientEntity: ClientEntity): Observable<Object> {
    const token = localStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token || ''
      })
    };

    console.log(token);
    return this.httpClient.put<ClientEntity>(this.apiServer + '/clients/' + clientId, clientEntity, httpOptions);
  }

  deleteClient(clientId: number): Observable<Object> {
    const token = localStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token || ''
      })
    };

    return this.httpClient.delete(this.apiServer + '/clients/' + clientId, httpOptions);
  }

}
