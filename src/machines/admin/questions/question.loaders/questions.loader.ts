import { db } from '$config/firebase';
import { Question } from '$models';
import { collection, query, where } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { map, catchError, tap } from 'rxjs/operators';

export const createQuestionsLoader = () => {
  const questionsQuery = query(collection(db, 'questions')).withConverter(
    Question.firebaseConverter()
  );

  return collectionData(questionsQuery, { idField: 'id' }).pipe(
    map((questions) => ({ type: 'LOAD.QUESTIONS', data: questions })),
    catchError((err) => [{ type: 'LOAD.ERROR', data: err }])
  );
};
