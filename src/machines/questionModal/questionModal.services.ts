import { db } from '$config/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import type { QuestionCtx, QuestionEvt } from './questionModal.machine';
import { Answer } from '$models';

function initServices(db) {
  return {
    answerSaver: (ctx: QuestionCtx, evt: QuestionEvt) => {
      if (!['ANSWER', 'SKIP'].includes(evt.type)) return;
      const answersRef = doc(collection(db, 'answers')).withConverter(
        Answer.firebaseConverter()
      );
      const answer = ctx.answers[ctx.currentQuestionIndex];
      return setDoc(answersRef, answer);
    },
  };
}

export const services = initServices(db);
