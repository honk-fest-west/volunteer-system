import { collection, query, where } from 'firebase/firestore';
import { db } from '$config/firebase';
import { ShiftSignUp } from '$models';
import { collectionData } from 'rxfire/firestore';
import { map, catchError, tap } from 'rxjs/operators';

export const createSignUpsLoader = (eventId: string, uid?: string) => {
  const q = (
    uid
      ? query(
          collection(db, 'events', eventId, 'signUps'),
          where('volunteerUid', '==', uid)
        )
      : query(collection(db, 'events', eventId, 'signUps'))
  ).withConverter(ShiftSignUp.firebaseConverter());

  return collectionData(q, { idField: 'id' }).pipe(
    map((signUps) => ({ type: 'LOAD.SIGN_UPS', data: signUps })),
    catchError((err) => [{ type: 'LOAD.ERROR', data: err }])
  );
};
