
export type EventStatus = 'CONFIRMED' |'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export type Event = {
  uuid: string;
  name: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  location: string;
  expectedAttendees: number;
  status: EventStatus;
}