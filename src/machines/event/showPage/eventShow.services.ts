import type { EventShowCtx } from './eventShow.machine';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
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
    eventPublisher: (ctx: EventShowCtx) => {
      const event = ctx.selectedEvent;
      event.status = 'open';
      const eventRef = doc(db, 'events', event.id).withConverter(
        VEvent.firebaseConverter()
      );
      return setDoc(eventRef, event);
    },
    eventLocker: (ctx: EventShowCtx) => {
      const event = ctx.selectedEvent;
      event.status = 'locked';
      const eventRef = doc(db, 'events', event.id).withConverter(
        VEvent.firebaseConverter()
      );
      return setDoc(eventRef, event);
    },
    eventArchiver: (ctx: EventShowCtx) => {
      const event = ctx.selectedEvent;
      event.status = 'archived';
      const eventRef = doc(db, 'events', event.id).withConverter(
        VEvent.firebaseConverter()
      );
      return setDoc(eventRef, event);
    },
  };
}

export const services = initServices(db);
