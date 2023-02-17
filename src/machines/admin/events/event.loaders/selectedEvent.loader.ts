import { db } from '$config/firebase';
import { VEvent } from '$models';
import { doc } from 'firebase/firestore';
import { docData } from 'rxfire/firestore';
import { map, catchError } from 'rxjs/operators';

export const createSelectedEventLoader = (id: string) => {
  const eventRef = doc(db, 'events', id).withConverter(
    VEvent.firebaseConverter()
  );

  return docData(eventRef, { idField: 'id' }).pipe(
    map((event) => ({ type: 'LOAD.SELECTED_EVENT', data: event })),
    catchError((err) => [{ type: 'LOAD.ERROR', data: err }])
  );
};
