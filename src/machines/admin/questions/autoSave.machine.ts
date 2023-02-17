import { createMachine, assign, actions } from 'xstate';
import { services } from './question.services';
import type { Question } from '$models';

const { cancel, send } = actions;

const DEBOUNCE_DELAY = 3000;

type AutoSaveEvt =
  | { type: 'QUESTION_CHANGED'; selectedQuestion: Question }
  | { type: 'SAVE_QUESTION'; selectedQuestion: Question };

export const autoSaveMachine = createMachine(
  {
    id: 'autoSave',
    initial: 'waitingChanges',
    context: {
      selectedQuestion: null,
    },
    states: {
      waitingChanges: {
        on: {
          QUESTION_CHANGED: {
            target: 'debouncing',
            actions: [
              'updateSelectedQuestion',
              'cancelSlowSaveQuestion',
              'sendSlowSaveQuestionAfterDelay',
            ],
          },
        },
      },
      debouncing: {
        on: {
          QUESTION_CHANGED: {
            actions: [
              'updateSelectedQuestion',
              'cancelSlowSaveQuestion',
              'sendSlowSaveQuestionAfterDelay',
            ],
          },
          SAVE_QUESTION: {
            target: 'saving',
          },
        },
      },
      saving: {
        invoke: {
          id: 'questionUpdater',
          src: 'questionUpdater',
          onDone: { target: 'waitingChanges' },
        },
      },
    },
  },
  {
    actions: {
      updateSelectedQuestion: assign({
        selectedQuestion: (_: unknown, evt: AutoSaveEvt) => {
          return evt.selectedQuestion;
        },
      }),
      cancelSlowSaveQuestion: cancel('debounced-save'),
      sendSlowSaveQuestionAfterDelay: send('SAVE_QUESTION', {
        delay: DEBOUNCE_DELAY,
        id: 'debounced-save',
      }),
    },
    services,
  }
);
