import { v4 as uuidv4 } from 'uuid';
import type { QuestionType } from '$types';
import { Timestamp } from 'firebase/firestore';

export type AnswerStatus = 'unanswered' | 'answered' | 'skipped';

export class Answer {
  id: string;
  volunteerUid: string;
  questionId: string;
  type: QuestionType;
  question: string;
  answer: string;
  status: AnswerStatus;
  skippedAt: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;

  constructor(data: Partial<Answer>) {
    this.id = data.id || uuidv4();
    this.volunteerUid = data.volunteerUid || null;
    this.questionId = data.questionId || null;
    this.type = data.type || 'text';
    this.question = data.question || null;
    this.answer = data.answer || null;
    this.status = data.status || 'unanswered';
    this.createdAt = data.createdAt || Timestamp.now();
  }

  static firebaseConverter() {
    return {
      toFirestore: (answer: Answer) => {
        const { id, ...rest } = answer;
        return { ...rest, updatedAt: Timestamp.now() };
      },
      fromFirestore: (snapshot, options) => {
        const rest = snapshot.data(options);
        return new Answer(snapshot.id).update(rest);
      },
    };
  }

  static answer(
    id: string,
    volunteerUid: string,
    data: Partial<Answer>
  ): Answer {
    return new Answer({
      id,
      volunteerUid,
      ...data,
    });
  }

  static skip(id: string, volunteerUid: string, data: Partial<Answer>): Answer {
    return new Answer({
      id,
      volunteerUid,
      ...data,
    });
  }

  public update(data: Partial<Answer>): Answer {
    delete data.id;
    Object.assign(this, data);
    return this;
  }
}
