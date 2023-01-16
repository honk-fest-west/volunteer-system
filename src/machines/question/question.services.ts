import { db } from '$config/firebase';
import { Question } from '$models';
import {
  collection,
  deleteDoc,
  doc,
  runTransaction,
  setDoc,
} from 'firebase/firestore';
import type { QuestionCtx, QuestionEvt } from './question.machine';
import { Answer } from '$models';

function initServices(db) {
  return {
    answerSaver: (ctx: QuestionCtx, evt: QuestionEvt) => {
      if (evt.type !== 'ANSWER') return;
      const answersRef = doc(collection(db, 'answers')).withConverter(
        Answer.firebaseConverter()
      );
      const answer = evt.data.question.answer(
        answersRef.id,
        ctx.user.uid,
        evt.data.answer
      );
    },
    questionSkipper: (ctx: QuestionCtx, evt: QuestionEvt) => {
      if (evt.type !== 'SKIP') return;
      const answersRef = doc(collection(db, 'answers')).withConverter(
        Answer.firebaseConverter()
      );
      const answer = evt.data.question.skip(answersRef.id, ctx.user.uid);
    },
  };
}

export const services = initServices(db);
