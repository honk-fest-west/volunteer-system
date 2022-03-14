import { db } from '$config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { sharedServices } from '../shared.services';
import type { EventShowCtx } from './eventShow.machine';

function initServices(db) {
  return {
    selectedEventLoader: (ctx: EventShowCtx) => {
      const eventRef = doc(db, 'events', ctx.selectedEventId);
      return getDoc(eventRef).then((doc) => ({ ...doc.data(), id: doc.id }));
    },
  };
}

export const services = initServices(db);
