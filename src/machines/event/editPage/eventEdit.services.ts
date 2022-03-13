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
import type { EventEditCtx } from './eventEdit.machine';

function initServices(db) {
  return {
    selectedEventLoader: (ctx: EventEditCtx) => {
      const eventRef = doc(db, 'events', ctx.selectedEventId);
      return getDoc(eventRef).then((doc) => ({ ...doc.data(), id: doc.id }));
    },
    eventUpdater: (ctx: EventEditCtx) => {
      const event = ctx.selectedEvent;
      const eventRef = doc(db, 'events', event.id);
      return setDoc(eventRef, event);
    },
  };
}
export const services = initServices(db);
