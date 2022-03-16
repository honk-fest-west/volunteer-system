import type { EventStatus } from '$types';
import { db } from '$config/firebase';
import { VEvent } from '$models';
import { collection, query, where } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { map } from 'rxjs/operators';

export const createEventsObservable = (selectStatuses: EventStatus[]) => {
  const q = query(
    collection(db, 'events'),
    where('status', 'in', selectStatuses)
  ).withConverter(VEvent.firebaseConverter());

  return collectionData(q, { idField: 'id' }).pipe(
    map((events) => ({ type: 'EVENTS.UPDATE', data: events }))
  );
};
