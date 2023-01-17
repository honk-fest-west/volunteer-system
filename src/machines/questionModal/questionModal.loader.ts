import { db } from '$config/firebase';
import { collectionData } from 'rxfire/firestore';
import { Question, Answer } from '$models';
import { combineLatest, Observable } from 'rxjs';
import { map, catchError, reduce } from 'rxjs/operators';
import { query, where, Query, collection } from 'firebase/firestore';

export function createQuestionLoader(uid: string) {
  return combineLatest({
    questions: questionsData(),
    answers: answersData(uid),
  }).pipe(
    map(toUnansweredQuestions),
    map((questions) => ({ type: 'LOAD.QUESTIONS', data: questions })),
    catchError((err) => {
      return [{ type: 'LOAD.ERROR', data: err }];
    })
  );
}

function toUnansweredQuestions({ questions, answers }) {
  return questions.filter((q) => !answers.find((a) => a.questionId === q.id));
}

function questionsData(): Observable<Question[]> {
  return collectionData(questionsQuery(), { idField: 'id' });
}

function questionsQuery(): Query<Question> {
  return query(
    collection(db, 'questions'),
    where('status', '==', 'published')
  ).withConverter(Question.firebaseConverter());
}

function answersData(uid: string): Observable<Answer[]> {
  return collectionData(answersQuery(uid), { idField: 'id' });
}

function answersQuery(uid: string): Query<Answer> {
  return query(
    collection(db, 'answers'),
    where('volunteerUid', '==', uid)
  ).withConverter(Answer.firebaseConverter());
}
