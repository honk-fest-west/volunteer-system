import { v4 as uuidv4 } from 'uuid';
import type { QuestionType } from '$types';
import { Timestamp } from 'firebase/firestore';
import { Answer, type AnswerStatus } from '$models';

export type QuestionStatus = 'draft' | 'published' | 'archived';

export class Question {
  id: string;
  createdAt: Timestamp;
  question: string;
  type: QuestionType;
  status: QuestionStatus;
  required: boolean;

  constructor(data: Partial<Question>) {
    this.id = data.id || uuidv4();
    this.createdAt = data.createdAt || Timestamp.now();
    this.question = data.question || null;
    this.type = data.type || 'text';
    this.status = data.status || 'published';
    this.required = data.required || false;
  }

  static firebaseConverter() {
    return {
      toFirestore: (question: Question) => {
        const { id, ...rest } = question;
        return rest;
      },
      fromFirestore: (snapshot, options) => {
        const rest = snapshot.data(options);
        return new Question(snapshot.id).update(rest);
      },
    };
  }

  public update(data: Partial<Question>): Question {
    delete data.id;
    Object.assign(this, data);
    return this;
  }

  public answer(id, uid, answer): Answer {
    return new Answer({
      id,
      answer,
      volunteerUid: uid,
      questionId: this.id,
      type: this.type,
      question: this.question,
      status: 'answered',
    });
  }

  public skip(id, uid): Answer {
    return new Answer({
      id,
      questionId: this.id,
      volunteerUid: uid,
      type: this.type,
      question: this.question,
      skippedAt: Timestamp.now(),
      status: 'skipped',
    });
  }
}

export const questions = {
  prefname: {
    type: 'text',
    question: 'What is your preferred name?',
  },
  pronouns: {
    type: 'text',
    question: 'What are your pronouns?',
  },
  emergecycontact: {
    type: 'text',
    question: 'Who is your emergency contact? What is their phone number?',
  },
  age: {
    type: 'text',
    question: 'Are you 18 or older?',
  },
  perfomer: {
    type: 'text',
    question: 'Are you a performer? Which band(s)?',
  },
  howdidyouhear: {
    type: 'text',
    question: 'How did you hear about HONK! Fest West?',
  },
  foodallergies: {
    type: 'text',
    question: 'Do you have any food allergies?',
  },
  whatelse: {
    type: 'text',
    question: 'What else would you like us to know?',
  },
};
