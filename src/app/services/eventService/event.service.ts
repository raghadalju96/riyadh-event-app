import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { APIs } from '../APIs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  getEvents(pageNumber: number): Observable<any> {
    const params = new HttpParams()
      .set('_format', 'json')
      .set('page', pageNumber);

    const options = { params: params };

    return this.http.get<any>(APIs.getEvent, options);
  }

  getEventById(eventId: number): Observable<any> {
    const params = new HttpParams().set('_format', 'json').set('id', eventId);

    const options = { params: params };

    return this.http.get<any>(APIs.getEvent, options);
  }
}
