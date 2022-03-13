import {
  addDoc,
  collection,
  getDocs,
  limit,
  query,
  where,
} from 'firebase/firestore';
import type { VEvent } from '$types';
import { Timestamp } from 'firebase/firestore';
import { db } from '$config/firebase';

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

function initializeEvent(): VEvent {
  return {
    id: null,
    status: 'draft',
    name: null,
    date: null,
    description: null,
    locationUrl: null,
    jobs: {},
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };
}

export const services = initServices(db);
