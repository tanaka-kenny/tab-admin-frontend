import { Component, inject, Input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputErrors } from '../../shared/ui/input-errors/input-errors';
import { SelectInput } from '../../shared/ui/select-input/select-input';
import { TextInput } from '../../shared/ui/text-input/text-input';
import { EventsService } from '../data-access/services/events-service';
import { AlertService } from '../../shared/data-access/services/alert-service';
import { MessageType } from '../../shared/data-access/models/alert.model';
import { SelectOption } from '../../shared/data-access/models/select-option.model';

const STATUS_OPTIONS: SelectOption[] = [
  { value: 'In Progress', key: 'IN_PROGRESS' },
  { value: 'Completed', key: 'COMPLETED' },
  { value: 'Cancelled', key: 'CANCELLED' },
  { value: 'Confirmed', key: 'CONFIRMED' },
];

@Component({
  selector: 'app-add-event',
  imports: [ReactiveFormsModule, TextInput, InputErrors, SelectInput, RouterLink],
  templateUrl: './add-event.html',
  styleUrl: './add-event.scss',
})
export class AddEvent {

  readonly #eventsService = inject(EventsService);
  readonly #formBuilder = inject(FormBuilder);
  readonly #router = inject(Router);
  readonly #alertService = inject(AlertService);

  readonly statusOptions = STATUS_OPTIONS;
  eventUuid?: string;

  @Input()
  set uuid(value: string) {
    this.eventUuid = value;
    this.#loadExistingEvent(value);
  }

  readonly saving = signal(false);

  readonly form = this.#formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    startDateTime: ['', [Validators.required]],
    endDateTime: ['', [Validators.required]],
    expectedAttendees: [1, [Validators.required, Validators.min(1)]],
    location: ['', [Validators.required]],
    status: ['', [Validators.required]],
  });

  onSaveEvent() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.form.markAllAsDirty();
      return;
    }

    this.saving.set(true);

    const action$ = this.eventUuid
      ? this.#eventsService.updateEvent(this.eventUuid, this.form.getRawValue())
      : this.#eventsService.createEvent(this.form.getRawValue());

    action$.subscribe({
      next: () => {
        this.#alertService.addAlert(MessageType.SUCCESS, 'Event saved successfully');
        void this.#router.navigate(['/landing/events']);
      },
      error: () => this.saving.set(false),
    });
  }

  #loadExistingEvent(uuid: string) {
    this.#eventsService.getEventByUuid(uuid).subscribe({
      next: (event) => {
        this.form.patchValue({
          name: event.name,
          description: event.description,
          startDateTime: event.startDateTime,
          endDateTime: event.endDateTime,
          expectedAttendees: event.expectedAttendees,
          location: event.location,
          status: event.status,
        });
      }
    })
  }

}