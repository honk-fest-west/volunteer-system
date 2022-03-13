import type { MachineConfig } from 'xstate';
import type { EventCtx, EventEvt } from './event.machine';

import { createMachine, actions as xstateActions } from 'xstate';

const { log } = xstateActions;

export const editPage: MachineConfig<EventCtx, any, EventEvt> = {
  initial: 'loadingSelectedEvent',
  states: {
    loadingSelectedEvent: {
      always: {
        target: 'idle',
        cond: 'isLoaded',
      },
      invoke: {
        id: 'selectedEventLoader',
        src: 'selectedEventLoader',
        onDone: { actions: 'setSelectedEvent', target: 'idle' },
        onError: { actions: 'setError', target: 'idle' },
      },
    },
    idle: {
      entry: 'initAutoSave',
      on: {
        UPDATE_EVENT: {
          actions: ['clearError', 'updateEvent'],
        },
        GOTO_INDEX: {
          actions: ['clearError', 'updateEvent', 'gotoIndex'],
          type: 'final',
        },
      },
    },
  },
};
