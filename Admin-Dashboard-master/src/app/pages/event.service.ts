import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class EventService {
  item: any;

  constructor(private http: HttpClient) { }

  server_address: string = '/api';
  // server_address :string ='http://localhost:5000';

  getevent(id: any) {
    return this.http.get(`${this.server_address}/events/event/` + id);
  }

  newEvent(item: any) {

    return this.http.post(`${this.server_address}/events/event-insert`, item)
  }

  getevents() {
    return this.http.get(`${this.server_address}/events/events`);
  }

  deleteevent(event: any) {
    return this.http.post(`${this.server_address}/events/event/remove`, event);
  }

  editEvent(item: any) {
    return this.http.post(`${this.server_address}/events/event/update`, item)
  }

  updateEventIndex(event: any) {
    return this.http.put(`${this.server_address}/events/event/updateIndex`, event);
  };



}
