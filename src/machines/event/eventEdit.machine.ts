import type { MachineConfig } from 'xstate';
import type { EventCtx, EventEvt } from './event.machine';

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
        ADD_JOB: { actions: ['clearError', 'addJob', 'updateEvent'] },
        DELETE_JOB: { actions: ['clearError', 'deleteJob', 'updateEvent'] },
        ADD_SHIFT: { actions: ['clearError', 'addShift', 'updateEvent'] },
        DELETE_SHIFT: { actions: ['clearError', 'deleteShift', 'updateEvent'] },
      },
    },
  },
};
