import { db } from '$config/firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import type { EventShowCtx } from './eventShow.machine';

function initServices(db) {
  return {
    selectedEventLoader: (ctx: EventShowCtx) => {
      const eventRef = doc(db, 'events', ctx.selectedEventId);
      return getDoc(eventRef).then((doc) => ({ ...doc.data(), id: doc.id }));
    },
    volunteerShiftsLoader: (ctx: EventShowCtx) => {
      const shiftsRef = collection(
        db,
        'events',
        ctx.selectedEventId,
        'volunteerShifts'
      );
      return getDocs(shiftsRef);
    },
  };
}

export const services = initServices(db);
