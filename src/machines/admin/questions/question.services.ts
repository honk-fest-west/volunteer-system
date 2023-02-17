import type { QuestionCtx } from './question.machine';
import { doc, collection, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '$config/firebase';
import { Question } from '$models';

export const services = {
  questionAdder,
  questionUpdater,
};

function questionAdder() {
  const questionsRef = doc(collection(db, 'questions')).withConverter(
    Question.firebaseConverter()
  );
  const question = new Question({ id: questionsRef.id });
  return setDoc(questionsRef, question).then(() => question.id);
}

function questionUpdater({ selectedQuestion }: QuestionCtx) {
  const questionRef = doc(db, 'questions', selectedQuestion.id).withConverter(
    Question.firebaseConverter()
  );

  return setDoc(
    questionRef,
    Question.from({ ...selectedQuestion, updatedAt: Timestamp.now() })
  );
}
