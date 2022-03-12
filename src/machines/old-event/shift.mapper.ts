import type { VEvent, Job, Shift, VolunteerShift } from '$types';
import { Timestamp } from 'firebase/firestore';

export const shiftMapper = (
  event: VEvent,
  job: Job,
  shift: Shift
): VolunteerShift => {
  return {
    id: shift.id,
    eventId: event.id,
    jobId: job.id,
    date: event.date,
    name: job.name,
    from: shift.from,
    to: shift.to,
    createdAt: Timestamp.now(),
    slots: shift.slots,
    volunteerUids: [],
  };
};
