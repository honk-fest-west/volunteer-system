import type { User, XStateSend } from '$types';
import type { Answer, Question } from '$models';
import { createMachine } from 'xstate';
import { actions } from './question.actions';
import { guards } from './question.guards';
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
      type: 'START_QUESTIONS';
      data: null;
    }
  | {
      type: 'GOTO_QUESTION';
      data: number;
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
      data: { question: Question; answer: string };
    }
  | {
      type: 'SKIP';
      data: { question: Question };
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
        currentQuestionIndex: 0,
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
              target: 'introducingQuestions',
            },
            'LOAD.ERROR': {
              actions: 'setError',
            },
          },
        },
        introducingQuestions: {
          on: {
            START_QUESTIONS: {
              target: 'askingQuestions',
            },
          },
        },
        askingQuestions: {
          always: [{ target: 'idle', cond: 'noQuestions' }],
          on: {
            GOTO_QUESTION: {
              actions: 'gotoQuestion',
            },
            ANSWER: {
              target: 'addingAnswer',
            },
            SKIP: {
              target: 'skippingQuestion',
            },
          },
        },
        addingAnswer: {
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
    { actions, guards }
  );
}
