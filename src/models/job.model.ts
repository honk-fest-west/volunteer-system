// export interface Job {
//   id: string;
//   createdAt: Timestamp;
//   color: string;
//   name: string | null;
//   description: string | null;
//   location: string | null;
//   shifts: Shifts;
// }

import { v4 as uuidv4 } from 'uuid';
import type { Shifts } from '$types';
import { Timestamp } from 'firebase/firestore';

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

  get bgColor(): string {
    return `bg-[${this.color}]`;
  }

  get totalSlots(): number {
    return Object.values(this.shifts).reduce(
      (acc, shift) => acc + shift.slots,
      0
    );
  }

  get totalSignedUp() {
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
