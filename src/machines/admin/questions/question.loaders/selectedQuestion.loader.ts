import { db } from '$config/firebase';
import { Question } from '$models';
import { doc } from 'firebase/firestore';
import { docData } from 'rxfire/firestore';
import { map, catchError } from 'rxjs/operators';

export const createSelectedQuestionLoader = (id: string) => {
  const questionRef = doc(db, 'questions', id).withConverter(
    Question.firebaseConverter()
  );

  return docData(questionRef, { idField: 'id' }).pipe(
    map((question) => ({ type: 'LOAD.SELECTED_QUESTION', data: question })),
    catchError((err) => [{ type: 'LOAD.ERROR', data: err }])
  );
};
