
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProjectEntity } from '../model/project-entity';
import { Injectable } from '@angular/core';
import { EventEntity } from '../model/event-entity';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiServer = "http://localhost:8080/api/v1";

  private apiSessionServer = "http://localhost:8080/user";

  constructor(private httpClient: HttpClient) { }

  create(projectEntity: ProjectEntity): Observable<ProjectEntity> {
    const token = localStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token || ''
      })
    };

    console.log(token);
    console.log(JSON.stringify(projectEntity));

    return this.httpClient.post<ProjectEntity>(this.apiServer + '/project', JSON.stringify(projectEntity), httpOptions);
  }
  

  createSession(projectEntity: ProjectEntity): Observable<ProjectEntity> {
    const token = localStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token || ''
      })
    };

    console.log(token);
    console.log(JSON.stringify(projectEntity));

    return this.httpClient.post<ProjectEntity>(this.apiSessionServer + '/eventlist', JSON.stringify(projectEntity), httpOptions);
  }
 
  getClient(): Observable<Object> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token || '',
      }),
    };

    return this.httpClient.get(
      this.apiServer + '/clients',
      httpOptions
    );
  }

  getProjectById(projectId: number): Observable<ProjectEntity> {
    const token = localStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token || ''
      })
    };
    return this.httpClient.get<ProjectEntity>(this.apiServer + '/projects/' + projectId, httpOptions);
  }

  deleteProject(projectId: number): Observable<Object> {
    const token = localStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token || ''
      })
    };

    return this.httpClient.delete(this.apiServer + '/projects/' + projectId, httpOptions);
  }

  getProjectsList(): Observable<ProjectEntity[]> {
    const token = localStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token || ''
      })
    };

    console.log(token);
    return this.httpClient.get<ProjectEntity[]>(this.apiServer + '/projects', httpOptions);
  }


  getSessionList(): Observable<EventEntity[]> {
    const token = localStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token || ''
      })
    };

    console.log(token);
    return this.httpClient.get<EventEntity[]>(this.apiSessionServer + '/eventlist', httpOptions);
  }
  updateProject(
    projectId: number = 1,
    projectEntity: ProjectEntity
  ): Observable<Object> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token || '',
      }),
    };

    return this.httpClient.put<ProjectEntity>(
      this.apiServer + '/projects/' + projectId,
      projectEntity,
      httpOptions
    );
  }

}





