import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Event } from '../event.model';


@Injectable()
export class EventsService {

  readonly #http = inject(HttpClient);
  readonly #baseUrl = environment.eventsService + '/api/events';

  getEvents() {
    return this.#http.get<Event[]>(this.#baseUrl);
  }

  createEvent(payload: {
    name: string;
    description: string,
    startDateTime: string,
    endDateTime: string;
    location: string;
    expectedAttendees: number;
  }) {
    return this.#http.post(this.#baseUrl, payload);
  }

  getEventByUuid(uuid: string){
    return this.#http.get<Event>(`${this.#baseUrl}/${uuid}`);
  }

  updateEvent(uuid: string, payload: {
    name: string;
    description: string,
    startDateTime: string,
    endDateTime: string;
    location: string;
    expectedAttendees: number;
    status: string;
  }) {
    return this.#http.put(`${this.#baseUrl}/${uuid}`, payload);
  }

  deleteEvent(uuid: string) {
    return this.#http.delete(`${this.#baseUrl}/${uuid}`);
  }
}
