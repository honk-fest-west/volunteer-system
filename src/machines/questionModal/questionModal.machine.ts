import type { User, XStateSend } from '$types';
import type { Answer, Question } from '$models';
import { createMachine } from 'xstate';
import { actions } from './questionModal.actions';
import { guards } from './questionModal.guards';
import { services } from './questionModal.services';
import type { StateMachine } from 'xstate';

export interface QuestionCtx {
  user: User;
  questions: Question[];
  answers: Answer[];
  error: string;
  currentQuestionIndex: number;
  questionsLoaderRef: any;
}

export type QuestionEvt =
  | {
      type: 'START';
      data: null;
    }
  | {
      type: 'LOAD.QUESTIONS';
      data: Question[];
    }
  | {
      type: 'LOAD.ERROR';
      data: string;
    }
  | {
      type: 'ANSWER';
      data: string;
    }
  | {
      type: 'SKIP';
      data: null;
    };

export type QuestionStateSend = XStateSend<QuestionCtx, QuestionEvt>;

export function createQuestionMachine(
  user: User
): StateMachine<QuestionCtx, any, QuestionEvt> {
  return createMachine<QuestionCtx, QuestionEvt>(
    {
      id: 'question',
      context: {
        user,
        questions: [],
        answers: [],
        currentQuestionIndex: null,
        error: null,
        questionsLoaderRef: null,
      },
      initial: 'idle',
      entry: 'spawnQuestionsLoader',
      states: {
        idle: {
          on: {
            'LOAD.QUESTIONS': {
              actions: 'setQuestions',
              target: 'checkingQuestions',
            },
            'LOAD.ERROR': {
              actions: 'setError',
            },
          },
        },
        checkingQuestions: {
          always: [
            { target: 'introducingQuestions', cond: 'hasQuestions' },
            { target: 'idle', cond: 'noQuestions' },
          ],
        },
        introducingQuestions: {
          on: {
            START: {
              target: 'askingQuestions',
              actions: 'startQuestions',
            },
          },
        },
        askingQuestions: {
          always: [{ target: 'idle', cond: 'noQuestions' }],
          on: {
            ANSWER: {
              actions: 'addAnswer',
              target: 'savingAnswer',
            },
            SKIP: {
              actions: 'skipQuestion',
              target: 'savingAnswer',
            },
          },
        },
        savingAnswer: {
          invoke: {
            id: 'answerSaver',
            src: 'answerSaver',
            onDone: {
              target: 'askingQuestions',
              actions: 'nextQuestion',
            },
            onError: {
              target: 'askingQuestions',
              actions: 'setError',
            },
          },
        },
        skippingQuestion: {
          invoke: {
            id: 'questionSkipper',
            src: 'questionSkipper',
            onDone: {
              target: 'askingQuestions',
              actions: 'nextQuestion',
            },
            onError: {
              target: 'askingQuestions',
              actions: 'setError',
            },
          },
        },
      },
    },
    { actions, guards, services }
  );
}
