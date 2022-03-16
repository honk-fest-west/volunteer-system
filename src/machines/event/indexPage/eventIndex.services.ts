import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { VEvent } from '$models';
import { db } from '$config/firebase';
import { sharedServices } from '../shared.services';

function initServices(db) {
  return {
    ...sharedServices,
    eventsLoader: () => {
      const q = query(
        collection(db, 'events'),
        where('status', '!=', 'archived'),
        limit(20)
      ).withConverter(VEvent.firebaseConverter());
      return getDocs(q);
    },
    eventAdder: () => {
      const eventsRef = doc(collection(db, 'events')).withConverter(
        VEvent.firebaseConverter()
      );
      const event = new VEvent(eventsRef.id);
      return setDoc(eventsRef, event).then(() => event);
    },
  };
}

export const services = initServices(db);
