import type { VEvent, Jobs, Job, Shifts, Shift } from '$types';

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
