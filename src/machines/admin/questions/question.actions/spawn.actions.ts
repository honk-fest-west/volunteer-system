import type { QuestionCtx } from '../question.machine';
import { assign, send, spawn } from 'xstate';
import { stop } from 'xstate/lib/actions';
import { autoSaveMachine } from '../autoSave.machine';
import {
  createQuestionsLoader,
  createSelectedQuestionLoader,
  createAnswersLoader,
} from '../question.loaders';

export const spawnActions = {
  // AUTOSAVE
  spawnAutoSave: assign({
    autoSaveRef: ({ selectedQuestion }: QuestionCtx) => {
      return spawn(autoSaveMachine.withContext({ selectedQuestion }));
    },
  }),
  stopAutoSave: stop(({ autoSaveRef }: QuestionCtx) => autoSaveRef),
  saveQuestion: send(
    ({ selectedQuestion }: QuestionCtx) => ({
      type: 'QUESTION_CHANGED',
      selectedQuestion,
    }),
    { to: (ctx: QuestionCtx) => ctx.autoSaveRef }
  ),

  // QUESTIONS
  spawnQuestionsLoader: assign({
    questionsLoaderRef: () => spawn(createQuestionsLoader()),
  }),
  stopQuestionsLoader: stop(
    ({ questionsLoaderRef }: QuestionCtx) => questionsLoaderRef
  ),

  // SELECTED QUESTION
  spawnSelectedQuestionLoader: assign({
    selectedQuestionLoaderRef: ({ selectedQuestionId }: QuestionCtx) =>
      spawn(createSelectedQuestionLoader(selectedQuestionId)),
  }),
  stopSelectedQuestionLoader: stop(
    ({ selectedQuestionLoaderRef }: QuestionCtx) => selectedQuestionLoaderRef
  ),

  // SIGN UPS
  spawnAnswersLoader: assign({
    answersLoaderRef: (ctx: QuestionCtx) =>
      spawn(createAnswersLoader(ctx.selectedQuestionId)),
  }),
  stopAnswersLoader: stop(
    ({ answersLoaderRef }: QuestionCtx) => answersLoaderRef
  ),
};
