import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
  writeBatch,
  Timestamp,
} from 'firebase/firestore';
import type { VEvent, Job, Shift, VolunteerShift } from '$types';

import { db } from '$config/firebase';
import type { EventEditCtx } from './eventEdit.machine';
import { sharedServices } from '../shared.services';

function initServices(db) {
  return {
    ...sharedServices,
    selectedEventLoader: (ctx: EventEditCtx) => {
      const eventRef = doc(db, 'events', ctx.selectedEventId);
      return getDoc(eventRef).then((doc) => ({ ...doc.data(), id: doc.id }));
    },
    eventUpdater: (ctx: EventEditCtx) => {
      const event = ctx.selectedEvent;
      const eventRef = doc(db, 'events', event.id);
      return setDoc(eventRef, event);
    },
    eventPublisher: (ctx: EventEditCtx) => {
      const { id, jobs } = ctx.selectedEvent;
      const batch = writeBatch(db);

      Object.values(jobs).forEach((job) => {
        Object.entries(job.shifts).forEach(([shiftId, shift]) => {
          const volunteerShift = initializeVolunteerShift(
            ctx.selectedEvent,
            job,
            shift
          );
          const volunteerShiftRef = doc(
            db,
            'events',
            id,
            'volunteerShifts',
            shiftId
          );
          batch.set(volunteerShiftRef, volunteerShift);
        });
      });

      return batch.commit();
    },
  };
}

function initializeVolunteerShift(
  event: VEvent,
  job: Job,
  shift: Shift
): VolunteerShift {
  return {
    id: shift.id,
    eventId: event.id,
    jobId: job.id,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    volunteerUids: [],
  };
}

export const services = initServices(db);
