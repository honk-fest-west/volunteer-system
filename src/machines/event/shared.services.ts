import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  Query,
  query,
  setDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import type { EventIndexEvt } from './indexPage/eventIndex.machine';
import type { EventEditEvt } from './editPage/eventEdit.machine';
import type { VEvent } from '$types';
import { db } from '$config/firebase';

function initServices(db) {
  return {
    eventDuplicator: (_, evt: EventIndexEvt | EventEditEvt) => {
      if (evt.type !== 'DUPLICATE_EVENT') return;
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
  };
}

export const sharedServices = initServices(db);
