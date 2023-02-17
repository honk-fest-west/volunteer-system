import type { Question, Answer } from '$models';
import { createMachine, type MachineConfig } from 'xstate';

import { actions } from './question.actions';
import { services } from './question.services';
import { guards } from './question.guards';
import type { XStateSend } from '$types';

export interface QuestionCtx {
  questions: Question[];
  answers: Answer[];
  selectedQuestionId: string | null;
  selectedQuestion: Question | null;
  selectedAnswerIds: string[];
  error: string | null;
  autoSaveRef: any;
  questionsLoaderRef: any;
  selectedQuestionLoaderRef: any;
  answersLoaderRef: any;
}

export type QuestionEvt =
  | { type: 'AT.INDEX'; data: null }
  | { type: 'AT.QUESTION'; data: string }
  | { type: 'GOTO.INDEX'; data: null }
  | { type: 'LOAD.QUESTIONS'; data: Question[] }
  | { type: 'LOAD.SELECTED_QUESTION'; data: Question }
  | { type: 'LOAD.ANSWERS'; data: Answer[] }
  | { type: 'LOAD.ERROR'; data: string }
  | { type: 'QUESTION.ADD'; data: null }
  | { type: 'QUESTION.SELECT'; data: string }
  | { type: 'QUESTION.SAVE'; data: null }
  | { type: 'QUESTION.TOGGLE_ACTIVE'; data: null }
  | { type: 'done.invoke.questionAdder'; data: string }
  | { type: 'error.invoke.questionAdder'; data: string };

export type QuestionStateSend = XStateSend<QuestionCtx, QuestionEvt>;

const config: MachineConfig<QuestionCtx, any, QuestionEvt> = {
  id: 'question',
  initial: 'idle',
  context: {
    questions: [],
    answers: [],
    selectedQuestionId: null,
    selectedQuestion: null,
    selectedAnswerIds: [],
    error: null,
    autoSaveRef: null,
    questionsLoaderRef: null,
    selectedQuestionLoaderRef: null,
    answersLoaderRef: null,
  },
  on: {
    'AT.INDEX': {
      target: 'listingQuestions',
    },
    'AT.QUESTION': {
      actions: 'setSelectedQuestionId',
      target: 'loadingSelectedQuestion',
    },
    'GOTO.INDEX': {
      actions: ['clearError', 'gotoIndex'],
    },
  },
  states: {
    idle: {},
    listingQuestions: {
      entry: ['spawnQuestionsLoader', 'clearSelectedQuestion'],
      on: {
        'QUESTION.ADD': {
          target: 'addingQuestion',
        },
        'QUESTION.SELECT': {
          actions: ['setSelectedQuestionId', 'gotoQuestion'],
        },
        'LOAD.QUESTIONS': {
          actions: 'setQuestions',
        },
        'LOAD.ERROR': {
          actions: 'setError',
        },
        'AT.QUESTION': {
          target: 'loadingSelectedQuestion',
        },
      },
      exit: 'stopQuestionsLoader',
    },
    addingQuestion: {
      invoke: {
        id: 'questionAdder',
        src: 'questionAdder',
        onDone: {
          actions: ['setSelectedQuestionId', 'gotoQuestion'],
        },
        onError: {
          actions: ['setError', 'gotoIndex'],
        },
      },
    },
    loadingSelectedQuestion: {
      entry: 'spawnSelectedQuestionLoader',
      on: {
        'LOAD.SELECTED_QUESTION': {
          actions: 'setSelectedQuestion',
          target: 'loadingAnswers',
        },
        'LOAD.ERROR': {
          actions: ['setError', 'gotoIndex'],
        },
      },
      exit: 'stopSelectedQuestionLoader',
    },
    loadingAnswers: {
      entry: 'spawnAnswersLoader',
      on: {
        'LOAD.ANSWERS': {
          actions: 'setAnswers',
          target: 'viewingQuestion',
        },
        'LOAD.ERROR': {
          actions: ['setError', 'gotoIndex'],
        },
      },
      exit: 'stopAnswersLoader',
    },
    viewingQuestion: {
      entry: ['setDraftStatus', 'spawnAutoSave'],
      invoke: {
        id: 'updatingStatusToDraft',
        src: 'questionUpdater',
        onError: {
          actions: ['setError', 'gotoIndex'],
        },
      },
      on: {
        'QUESTION.SAVE': {
          actions: ['clearError', 'saveQuestion'],
        },
        'QUESTION.TOGGLE_ACTIVE': {
          actions: ['clearError', 'toggleActive', 'saveQuestion'],
        },
        'GOTO.INDEX': {
          target: 'listingQuestions',
          actions: ['clearError', 'gotoIndex'],
        },
      },
      exit: 'stopAutoSave',
    },
  },
};

export const questionMachine = createMachine<QuestionCtx, QuestionEvt>(config, {
  actions,
  services,
  guards,
});
