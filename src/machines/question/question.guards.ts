import type { QuestionCtx } from './question.machine';

export const guards = {
  hasQuestions: (ctx: QuestionCtx) => ctx.questions.length > ctx.answers.length,
  noQuestions: (ctx: QuestionCtx) => {
    return ctx.questions.length === ctx.answers.length;
  },
};
