import type { QuestionCtx, QuestionEvt } from './question.machine';
import { assign, spawn } from 'xstate';
import { createQuestionLoader } from './question.loader';
import { send } from 'xstate/lib/actions';
import type { Observable } from 'rxjs';

export const actions = {
  spawnQuestionsLoader: assign({
    questionsLoaderRef: (ctx: QuestionCtx) =>
      spawn(createQuestionLoader(ctx.user.uid)),
  }),
  setQuestions: assign({
    questions: (ctx: QuestionCtx, evt: QuestionEvt) => {
      if (evt.type !== 'LOAD.QUESTIONS') return ctx.questions;
      return evt.data;
    },
    currentQuestionIndex: (ctx: QuestionCtx, evt: QuestionEvt) => {
      if (evt.type !== 'LOAD.QUESTIONS') return ctx.currentQuestionIndex;
      return 0;
    },
    error: (ctx: QuestionCtx, evt: QuestionEvt) => {
      if (evt.type !== 'LOAD.ERROR') return ctx.error;
      return evt.data;
    },
  }),
  nextQuestion: assign({
    currentQuestionIndex: (ctx: QuestionCtx) => ctx.currentQuestionIndex + 1,
  }),
  gotoQuestion: assign({
    currentQuestionIndex: (ctx: QuestionCtx, evt: QuestionEvt) => {
      if (evt.type !== 'GOTO_QUESTION') return ctx.currentQuestionIndex;
      return evt.data;
    },
  }),
};
