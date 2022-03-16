import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import type { EventIndexEvt } from './indexPage/eventIndex.machine';
import type { EventEditEvt } from './editPage/eventEdit.machine';
import { VEvent } from '$models';
import { db } from '$config/firebase';

function initServices(db) {
  return {
    eventDuplicator: (_, evt: EventIndexEvt | EventEditEvt) => {
      if (evt.type !== 'DUPLICATE_EVENT') return;
      const event = evt.data as VEvent;

      const eventsRef = doc(collection(db, 'events')).withConverter(
        VEvent.firebaseConverter()
      );
      const newEvent = event.duplicate(eventsRef.id);
      return setDoc(eventsRef, newEvent).then(() => newEvent);
    },
  };
}

export const sharedServices = initServices(db);
