import { db } from '$config/firebase';
import { collectionData } from 'rxfire/firestore';
import { Question } from '$models';
import { map, catchError } from 'rxjs/operators';
import { query, where, Query, collection } from 'firebase/firestore';

export function createQuestionLoader(uid: string) {
  return collectionData(questionsQuery(), { idField: 'id' }).pipe(
    map((questions) => ({ type: 'LOAD.QUESTIONS', data: questions })),
    catchError((err) => {
      return [{ type: 'LOAD.ERROR', data: err }];
    })
  );
}

function questionsQuery(): Query<Question> {
  return query(
    collection(db, 'questions'),
    where('status', '==', 'published')
  ).withConverter(Question.firebaseConverter());
}
