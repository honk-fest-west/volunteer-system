import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { db } from '$config/firebase';
import { initializeEvent } from './event.model';

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
  };
}
export const services = initServices(db);
