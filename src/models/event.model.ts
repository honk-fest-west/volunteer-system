import type { Jobs, Shifts, Shift, EventStatus } from '$types';
import type { Job } from '$models';
import { Timestamp, type FirestoreDataConverter } from 'firebase/firestore';

export function sortedJobs(jobs: Jobs): Job[] {
  return Object.values(jobs).sort(
    (a: Job, b: Job) => a.createdAt?.seconds - b.createdAt?.seconds
  );
}

export function sortedShifts(shifts: Shifts): Shift[] {
  return Object.values(shifts).sort(
    (a, b) => a.createdAt?.seconds - b.createdAt?.seconds
  );
}

export class VEvent {
  status: EventStatus;
  name: string | null;
  date: string | null;
  description: string | null;
  jobs: Jobs;
  createdAt: Timestamp;
  updatedAt: Timestamp;

  constructor(public id: string) {
    this.id = id;
    this.status = 'draft';
    this.name = null;
    this.date = null;
    this.description = null;
    this.jobs = {};
    this.createdAt = Timestamp.now();
    this.updatedAt = Timestamp.now();
  }

  public static firebaseConverter(): FirestoreDataConverter<VEvent> {
    return {
      toFirestore: (model: VEvent) => {
        const { id, ...rest } = model;
        return rest;
      },
      fromFirestore: (snapshot, options) => {
        const rest = snapshot.data(options);
        return new VEvent(snapshot.id).update(rest);
      },
    };
  }

  public static from(data: Partial<VEvent>): VEvent {
    const event = new VEvent(data.id);
    Object.assign(event, data);
    return event;
  }

  public update(data: Partial<VEvent>): VEvent {
    delete data.id;
    Object.assign(this, data);
    return this;
  }

  public duplicate(newId: string): VEvent {
    const event = new VEvent(newId);
    Object.assign(event, this);
    event.id = newId;
    event.name = `${this.name} (copy)`;
    event.status = 'draft';
    return event;
  }
}
