import { v4 as uuidv4 } from 'uuid';
import type { Shifts, Shift, JobSignUpCollection } from '$types';
import { Timestamp } from 'firebase/firestore';
import type { ShiftSignUp } from '$models';

export class Job {
  id: string;
  createdAt: Timestamp;
  color: string;
  name: string | null;
  description: string | null;
  location: string | null;
  shifts: Shifts;

  constructor() {
    this.id = uuidv4();
    this.createdAt = Timestamp.now();
    this.name = null;
    this.description = null;
    this.location = null;
    this.shifts = {};
    this.color = this.getRandomDarkColor(); //'#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  public static from(data: Partial<Job>): Job {
    const job = new Job();
    Object.assign(job, data);
    return job;
  }

  get totalSlots(): number {
    return Object.values(this.shifts).reduce(
      (acc, shift) => acc + shift.slots,
      0
    );
  }

  get totalSignedUp(): number {
    return Object.values(this.shifts).reduce(
      (acc, shift) => acc + shift.signedUp,
      0
    );
  }

  get totalShifts(): number {
    return Object.keys(this.shifts).length;
  }

  get filledShifts(): number {
    return Object.values(this.shifts).reduce((acc, shift) => {
      const { slots, signedUp } = shift;
      return acc + (slots > signedUp ? 0 : 1);
    }, 0);
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
  ): { shift: Shift; signUpId: string; checked: boolean }[] {
    const shiftSignedUpIds = Object.keys(signUps[this.id] || {});
    return Object.values(this.shifts)
      .filter(
        (shift) =>
          // Only return shifts that are not signed up
          // or that the user has already signed up for.
          shift.slots > shift.signedUp || shiftSignedUpIds.includes(shift.id)
      )
      .map((shift) => {
        // Set a selected marker if the shift is already signed up.
        // shift.selected = shiftSignedUpIds.includes(shift.id);
        // if (shift.selected) {
        const signUpId = ((signUps[this.id] || {})[shift.id] || [])[0]?.id;

        // Set a conflict marker if the shift conflicts with user schedule
        //shift.conflict = false; // TODO: Implement conflict detection
        return { shift, signUpId, checked: !!signUpId };
      });
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
