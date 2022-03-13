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
} from 'firebase/firestore';
import { db } from '$config/firebase';
import { initializeEvent } from './event.model';
import type { EventCtx, EventEvt } from './event.machine';

function initServices(db) {
  return {
    eventsLoader: () => {
      const eventsRef = collection(db, 'events');
      const q = query(eventsRef, where('status', '!=', 'archived'), limit(20));
      return getDocs(q);
    },
    eventAdder: () => {
      const eventsRef = collection(db, 'events');
      const event = initializeEvent();
      return addDoc(eventsRef, event).then((ref) => ({ ...event, id: ref.id }));
    },
    selectedEventLoader: (ctx: EventCtx) => {
      const eventRef = doc(db, 'events', ctx.selectedEventId);
      return getDoc(eventRef).then((doc) => ({ ...doc.data(), id: doc.id }));
    },
    eventUpdater: (ctx: EventCtx) => {
      const event = ctx.selectedEvent;
      const eventRef = doc(db, 'events', event.id);
      return setDoc(eventRef, event);
    },
  };
}
export const services = initServices(db);
