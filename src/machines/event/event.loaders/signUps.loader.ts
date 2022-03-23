import { collection, query, where } from 'firebase/firestore';
import { db } from '$config/firebase';
import { ShiftSignUp } from '$models';
import { collectionData } from 'rxfire/firestore';
import { map, catchError, tap } from 'rxjs/operators';

export const createSignUpsLoader = (eventId: string) => {
  return collectionData(signUpsQuery(eventId), { idField: 'id' }).pipe(
    map((signUps) => ({ type: 'LOAD.SIGN_UPS', data: signUps })),
    catchError((err) => [{ type: 'LOAD.ERROR', data: err }])
  );
};

function signUpsQuery(eventId: string) {
  return query(collection(db, 'events', eventId, 'signUps')).withConverter(
    ShiftSignUp.firebaseConverter()
  );
}
