import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  Query,
  query,
  setDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { db } from '$config/firebase';
import type { EventCtx, EventEvt } from './event.machine';
import type { VEvent } from '$types';
import { eventMapper } from './event.mapper';
import { shiftMapper } from './shift.mapper';

function initServices(db) {
  return {
    eventLoader: (_, evt: EventEvt) => {
      const docRef = doc(db, 'events', evt.data as string);
      return getDoc(docRef).then((doc) => eventMapper(doc.data()));
    },
    eventsLoader: () => {
      const eventsRef = collection(db, 'events');
      const q: Query = query(
        eventsRef,
        where('status', '!=', 'archived'),
        limit(20)
      );
      return getDocs(q);
    },
    eventAdder: () => {
      const event = eventMapper({});
      const eventsRef = collection(db, 'events');
      return addDoc(eventsRef, event).then((eventRef) => ({
        ...event,
        id: eventRef.id,
      }));
    },
    eventUpdater: (ctx: EventCtx) => {
      const event = ctx.selectedEvent;
      const eventRef = doc(db, 'events', event.id);
      return setDoc(eventRef, event);
    },
    eventDuplicator: (_, evt: EventEvt) => {
      const event = evt.data as VEvent;
      const newEvent = {
        ...event,
        id: null,
        name: `${event.name} - COPY`,
        status: 'draft',
      };
      const eventsRef = collection(db, 'events');
      return addDoc(eventsRef, newEvent).then((eventRef) => ({
        ...newEvent,
        id: eventRef.id,
      }));
    },
    eventOpener: (ctx: EventCtx) => {
      const { id, jobs } = ctx.selectedEvent;
      const batch = writeBatch(db);

      Object.values(jobs).forEach((job) => {
        Object.entries(job.shifts).forEach(([shiftId, shift]) => {
          const volunteerShift = shiftMapper(ctx.selectedEvent, job, shift);
          console.log('eventOpener:', volunteerShift);
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

export const services = initServices(db);
