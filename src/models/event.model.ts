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

  public static signedUpPath({
    jobId,
    shiftId,
  }: {
    jobId: string;
    shiftId: string;
  }): string {
    return `jobs.${jobId}.shifts.${shiftId}.signedUp`;
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

  public incrementSignedUp(jobId: string, shiftId: string): VEvent {
    const job = this.jobs[jobId];
    if (!job) {
      return this;
    }
    const shift = job.shifts[shiftId];
    if (!shift) {
      return this;
    }
    shift.signedUp += 1;
    return this;
  }

  public decrementSignedUp(jobId: string, shiftId: string): VEvent {
    const job = this.jobs[jobId];
    if (!job) {
      return this;
    }
    const shift = job.shifts[shiftId];
    if (!shift) {
      return this;
    }
    shift.signedUp -= 1;
    return this;
  }

  public signedUp({
    jobId,
    shiftId,
  }: {
    jobId: string;
    shiftId: string;
  }): number {
    const job = this.jobs[jobId];
    if (!job) {
      return 0;
    }
    const shift = job.shifts[shiftId];
    if (!shift) {
      return 0;
    }
    return shift.signedUp;
  }
}
