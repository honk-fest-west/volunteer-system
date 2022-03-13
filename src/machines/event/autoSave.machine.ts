import { createMachine, assign, actions } from 'xstate';
import { services } from './event.services';
import type { VEvent } from '$types';

const { cancel, send } = actions;

const DEBOUNCE_DELAY = 3000;
interface AutoSaveCtx {
  selectedEvent: VEvent | null;
}

type AutoSaveEvt =
  | { type: 'EVENT_CHANGED'; selectedEvent: VEvent }
  | { type: 'SAVE_EVENT'; selectedEvent: VEvent };

export const autoSaveMachine = createMachine(
  {
    id: 'autoSave',
    initial: 'waitingChanges',
    context: {
      selectedEvent: null,
    },
    states: {
      waitingChanges: {
        on: {
          EVENT_CHANGED: {
            target: 'debouncing',
            actions: [
              'updateSelectedEvent',
              'cancelSlowSaveEvent',
              'sendSlowSaveEventAfterDelay',
            ],
          },
        },
      },
      debouncing: {
        on: {
          EVENT_CHANGED: {
            actions: [
              'updateSelectedEvent',
              'cancelSlowSaveEvent',
              'sendSlowSaveEventAfterDelay',
            ],
          },
          SAVE_EVENT: {
            target: 'saving',
          },
        },
      },
      saving: {
        invoke: {
          id: 'eventUpdater',
          src: 'eventUpdater',
          onDone: { target: 'waitingChanges' },
        },
      },
    },
  },
  {
    actions: {
      updateSelectedEvent: assign({
        selectedEvent: (_: unknown, evt: AutoSaveEvt) => {
          return evt.selectedEvent;
        },
      }),
      cancelSlowSaveEvent: cancel('debounced-save'),
      sendSlowSaveEventAfterDelay: send('SAVE_EVENT', {
        delay: DEBOUNCE_DELAY,
        id: 'debounced-save',
      }),
    },
    services,
  }
);
