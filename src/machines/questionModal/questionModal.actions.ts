import type { QuestionCtx, QuestionEvt } from './questionModal.machine';
import { assign, spawn } from 'xstate';
import { createQuestionLoader } from './questionModal.loader';

export const actions = {
  spawnQuestionsLoader: assign({
    questionsLoaderRef: (ctx: QuestionCtx) =>
      spawn(createQuestionLoader(ctx.user.uid)),
  }),
  startQuestions: assign({
    currentQuestionIndex: 0,
  }),
  setQuestions: assign({
    questions: (ctx: QuestionCtx, evt: QuestionEvt) => {
      if (evt.type !== 'LOAD.QUESTIONS') return ctx.questions;
      return evt.data;
    },
    error: (ctx: QuestionCtx, evt: QuestionEvt) => {
      if (evt.type !== 'LOAD.ERROR') return ctx.error;
      return evt.data;
    },
  }),
  nextQuestion: assign({
    currentQuestionIndex: (ctx: QuestionCtx) => ctx.currentQuestionIndex + 1,
  }),
  addAnswer: assign({
    answers: (ctx: QuestionCtx, evt: QuestionEvt) => {
      if (evt.type !== 'ANSWER') return ctx.answers;
      const question = ctx.questions[ctx.currentQuestionIndex];
      const answer = question.answer(ctx.user.uid, evt.data);
      return [...ctx.answers, answer];
    },
  }),
  skipQuestion: assign({
    answers: (ctx: QuestionCtx, evt: QuestionEvt) => {
      if (evt.type !== 'SKIP') return ctx.answers;
      const question = ctx.questions[ctx.currentQuestionIndex];
      const answer = question.skip(ctx.user.uid);
      return [...ctx.answers, answer];
    },
  }),
  setError: assign({
    error: (ctx: QuestionCtx, evt: QuestionEvt) => {
      if (!['LOAD.ERROR', 'ANSWER', 'SKIP'].includes(evt.type))
        return ctx.error;
      return evt.data;
    },
  }),
};
