import { collection, query, where } from 'firebase/firestore';
import { db } from '$config/firebase';
import { Answer } from '$models';
import { collectionData } from 'rxfire/firestore';
import { map, catchError, tap } from 'rxjs/operators';

export const createAnswersLoader = (questionId: string) => {
  return collectionData(answersQuery(questionId), { idField: 'id' }).pipe(
    map((answers) => ({ type: 'LOAD.ANSWERS', data: answers })),
    catchError((err) => [{ type: 'LOAD.ERROR', data: err }])
  );
};

function answersQuery(questionId: string) {
  return query(
    collection(db, 'answers'),
    where('questionId', '==', questionId),
    where('answer', '!=', null)
  ).withConverter(Answer.firebaseConverter());
}
