import type { EventStatus } from '$types';
import { db } from '$config/firebase';
import { VEvent } from '$models';
import { collection, query, where } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { map, catchError, tap } from 'rxjs/operators';

export const createEventsLoader = (selectStatuses: EventStatus[]) => {
  const eventsQuery = query(
    collection(db, 'events'),
    where('status', 'in', selectStatuses)
  ).withConverter(VEvent.firebaseConverter());

  return collectionData(eventsQuery, { idField: 'id' }).pipe(
    map((events) => ({ type: 'LOAD.EVENTS', data: events })),
    catchError((err) => [{ type: 'LOAD.ERROR', data: err }])
  );
};
