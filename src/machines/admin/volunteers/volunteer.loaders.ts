import type { EventStatus } from '$types';
import { db } from '$config/firebase';
import { VEvent } from '$models';
import { collection, query, where } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { map, catchError, tap } from 'rxjs/operators';

export const createVolunteersLoader = () => {
  const usersQuery = query(collection(db, 'users')).withConverter(
    VEvent.firebaseConverter()
  );

  return collectionData(usersQuery, { idField: 'uid' }).pipe(
    map((users) => ({ type: 'LOAD.VOLUNTEERS', data: users })),
    catchError((err) => [{ type: 'LOAD.ERROR', data: err }])
  );
};
