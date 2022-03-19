import { collection, query, where } from 'firebase/firestore';
import { db } from '$config/firebase';
import { ShiftSignUp } from '$models';
import { collectionData } from 'rxfire/firestore';
import { map, catchError, tap } from 'rxjs/operators';

export const createSignUpsObservable = (eventId: string, uid?: string) => {
  const q = (
    uid
      ? query(
          collection(db, 'events', eventId, 'signUps'),
          where('volunteerUid', '==', uid)
        )
      : query(collection(db, 'events', eventId, 'signUps'))
  ).withConverter(ShiftSignUp.firebaseConverter());

  return collectionData(q, { idField: 'id' }).pipe(
    map((signUps) => ({ type: 'SIGN_UPS.UPDATE', data: signUps })),
    catchError(() => [{ type: 'SIGN_UPS.UPDATE', data: [] }])
  );
};
