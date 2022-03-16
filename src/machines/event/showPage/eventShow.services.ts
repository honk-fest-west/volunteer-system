import type { EventShowCtx } from './eventShow.machine';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '$config/firebase';
import { VEvent } from '$models';

function initServices(db) {
  return {
    selectedEventLoader: (ctx: EventShowCtx) => {
      const eventRef = doc(db, 'events', ctx.selectedEventId).withConverter(
        VEvent.firebaseConverter()
      );
      return getDoc(eventRef).then((doc) => doc.data());
    },
    shiftSignUpsLoader: (ctx: EventShowCtx) => {
      const signUpsRef = collection(
        db,
        'events',
        ctx.selectedEventId,
        'shiftSignUps'
      );
      return getDocs(signUpsRef).catch(() => ({ docs: [] }));
    },
  };
}

export const services = initServices(db);
