import { v4 as uuidv4 } from 'uuid';
import type { Shifts, Shift, JobSignUpCollection } from '$types';
import { Timestamp } from 'firebase/firestore';

export class Job {
  static PER_SCHEDULE_PAGE = 6;

  id: string;
  createdAt: Timestamp;
  color: string;
  name: string | null;
  description: string | null;
  shifts: Shifts;

  constructor() {
    this.id = uuidv4();
    this.createdAt = Timestamp.now();
    this.name = null;
    this.description = null;
    this.shifts = {};
    this.color = this.getRandomDarkColor(); //'#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  public static from(data: Partial<Job>): Job {
    const job = new Job();
    Object.assign(job, data);
    return job;
  }

  get sortedShifts(): Shift[] {
    return Object.values(this.shifts).sort(
      (a, b) => a.createdAt?.seconds - b.createdAt?.seconds
    );
  }

  // Takes a list of current signUps and returns

  // a list of shifts that are available for signup.
  //
  // Takes into account if a shift conflicts with
  // another signed up shift and sets a conflict marker.
  public selectableShifts(
    signUps: JobSignUpCollection
  ): { shift: Shift; signUpId: string; comment: string; checked: boolean }[] {
    const shiftSignedUpIds = Object.keys(signUps[this.id] || {});
    return this.sortedShifts
      .filter(
        (shift) =>
          // Only return shifts that are not signed up
          // or that the user has already signed up for.
          shift.slots > shift.signedUp || shiftSignedUpIds.includes(shift.id)
      )
      .map((shift) => {
        const signUpId = ((signUps[this.id] || {})[shift.id] || [])[0]?.id;
        const comment = ((signUps[this.id] || {})[shift.id] || [])[0]?.comment;

        // Set a conflict marker if the shift conflicts with user schedule
        //shift.conflict = false; // TODO: Implement conflict detection
        return { shift, signUpId, comment, checked: !!signUpId };
      });
  }

  public get isClosed(): boolean {
    return !Object.values(this.shifts).find(
      (shift) =>
        // Only return shifts that are not signed up
        // or that the user has already signed up for.
        shift.slots > shift.signedUp
    )
  }

  private getRandomDarkColor(): string {
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 10);
    }
    return color;
  }
}

// const colors = [
// 	'bg-orange-600',
// 	'bg-teal-600',
// 	'bg-yellow-600',
// 	'bg-purple-600',
// 	'bg-sky-600',
// 	'bg-green-600',
// 	'bg-indigo-600',
// 	'bg-pink-600',
// ];
