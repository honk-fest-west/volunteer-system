import { db } from '$config/firebase';
import { VEvent } from '$models';
import { doc } from 'firebase/firestore';
import { docData } from 'rxfire/firestore';
import { map } from 'rxjs/operators';

export const createSelectedEventObservable = (id: string) => {
  const eventRef = doc(db, 'events', id).withConverter(
    VEvent.firebaseConverter()
  );

  return docData(eventRef, { idField: 'id' }).pipe(
    map((event) => ({ type: 'SELECTED_EVENT.UPDATE', data: event }))
  );
};
