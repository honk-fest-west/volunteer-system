import type { EventEditCtx } from './eventEdit.machine';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { VEvent } from '$models';
import { db } from '$config/firebase';
import { sharedServices } from '../shared.services';

function initServices(db) {
  return {
    ...sharedServices,
    selectedEventLoader: (ctx: EventEditCtx) => {
      const eventRef = doc(db, 'events', ctx.selectedEventId).withConverter(
        VEvent.firebaseConverter()
      );
      return getDoc(eventRef).then((doc) => doc.data());
    },
    eventUpdater: (ctx: EventEditCtx) => {
      const event = ctx.selectedEvent;
      const eventRef = doc(db, 'events', event.id).withConverter(
        VEvent.firebaseConverter()
      );
      return setDoc(eventRef, event);
    },
    eventDrafter: (ctx: EventEditCtx) => {
      const event = ctx.selectedEvent;
      event.status = 'draft';
      const eventRef = doc(db, 'events', event.id).withConverter(
        VEvent.firebaseConverter()
      );
      return setDoc(eventRef, event);
    },
    eventPreviewer: (ctx: EventEditCtx) => {
      const event = ctx.selectedEvent;
      event.status = 'preview';
      const eventRef = doc(db, 'events', event.id).withConverter(
        VEvent.firebaseConverter()
      );
      return setDoc(eventRef, event);
    },
    eventPublisher: (ctx: EventEditCtx) => {
      const event = ctx.selectedEvent;
      event.status = 'open';
      const eventRef = doc(db, 'events', event.id).withConverter(
        VEvent.firebaseConverter()
      );
      return setDoc(eventRef, event);
    },
  };
}

export const services = initServices(db);
