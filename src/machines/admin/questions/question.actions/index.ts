import type { QuestionCtx, QuestionEvt } from '../question.machine';
import { assign } from 'xstate';
import { gotoActions } from './goto.actions';
import { spawnActions } from './spawn.actions';

export const actions = {
  ...gotoActions,
  ...spawnActions,

  setQuestions: assign({
    questions: (ctx: QuestionCtx, evt: QuestionEvt) => {
      if (evt.type !== 'LOAD.QUESTIONS') return ctx.questions;
      return evt.data;
    },
  }),

  setSelectedQuestionId: assign({
    selectedQuestionId: (ctx: QuestionCtx, evt: QuestionEvt) => {
      if (
        evt.type !== 'AT.QUESTION' &&
        evt.type !== 'QUESTION.SELECT' &&
        evt.type !== 'done.invoke.questionAdder'
      )
        return ctx.selectedQuestionId;

      return evt.data;
    },
  }),

  setSelectedQuestion: assign({
    selectedQuestion: (ctx: QuestionCtx, evt: QuestionEvt) => {
      if (evt.type !== 'LOAD.SELECTED_QUESTION') return ctx.selectedQuestion;
      return evt.data;
    },
  }),

  setAnswers: assign({
    answers: (ctx: QuestionCtx, evt: QuestionEvt) => {
      if (evt.type !== 'LOAD.ANSWERS') return ctx.answers;
      return evt.data;
    },
  }),

  toggleActive: assign({
    selectedQuestion: (ctx: QuestionCtx) => {
      if (!ctx.selectedQuestion) return ctx.selectedQuestion;
      return {
        ...ctx.selectedQuestion,
        active: !ctx.selectedQuestion.active,
      };
    },
  }),

  clearSelectedQuestion: assign({
    selectedQuestionId: () => null,
    selectedQuestion: () => null,
    answers: () => ({}),
  }),

  setError: assign({
    error: (ctx: QuestionCtx, evt: QuestionEvt) => {
      if (evt.type !== 'LOAD.ERROR') return ctx.error;
      return evt.data;
    },
  }),

  clearError: assign({
    error: () => null,
  }),
};
