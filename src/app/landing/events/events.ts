import { Component, inject, OnInit, signal } from '@angular/core';
import { EventsService } from '../data-access/services/events-service';
import { Event } from '../data-access/event.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-events',
  imports: [RouterLink],
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class Events implements OnInit {
  readonly #eventsService = inject(EventsService);

  readonly events = signal<Event[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  ngOnInit() {
    this.#eventsService.getEvents().subscribe({
      next: (data) => {
        this.events.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load events. Please try again.');
        this.loading.set(false);
      },
    });
  }

  deleteEvent(uuid: string) {
    if (!confirm('Are you sure you want to delete this event?'))
      return;

    this.#eventsService.deleteEvent(uuid).subscribe({
      next: () => this.events.update(list => list.filter(e => e.uuid !== uuid)),
    });
  }

  formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  formatTime(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' });
  }
}
