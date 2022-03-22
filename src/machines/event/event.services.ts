import type { EventCtx } from './event.machine';
import { doc, collection, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '$config/firebase';
import { VEvent } from '$models';

export const services = {
  eventAdder,
  eventUpdater,
  eventDuplicator,
};

function eventAdder() {
  const eventsRef = doc(collection(db, 'events')).withConverter(
    VEvent.firebaseConverter()
  );
  const event = new VEvent(eventsRef.id);
  return setDoc(eventsRef, event).then(() => event.id);
}

function eventUpdater({ selectedEvent }: EventCtx) {
  const eventRef = doc(db, 'events', selectedEvent.id).withConverter(
    VEvent.firebaseConverter()
  );

  return setDoc(
    eventRef,
    VEvent.from({ ...selectedEvent, updatedAt: Timestamp.now() })
  );
}

function eventDuplicator({ selectedEvent }: EventCtx) {
  const eventsRef = doc(collection(db, 'events')).withConverter(
    VEvent.firebaseConverter()
  );
  const newEvent = VEvent.from(selectedEvent).duplicate(eventsRef.id);
  return setDoc(eventsRef, newEvent).then(() => newEvent.id);
}
