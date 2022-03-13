import type { MachineConfig } from 'xstate';
import type { EventCtx, EventEvt } from './event.machine';

export const indexPage: MachineConfig<EventCtx, any, EventEvt> = {
  initial: 'loadingEvents',
  states: {
    loadingEvents: {
      always: {
        target: 'idle',
        cond: 'isLoaded',
      },
      invoke: {
        id: 'eventsLoader',
        src: 'eventsLoader',
        onDone: { actions: 'setEvents', target: 'idle' },
        onError: { actions: 'setError', target: 'idle' },
      },
    },
    idle: {
      on: {
        SELECT_EVENT: {
          type: 'final',
          actions: 'gotoEvent',
        },
        ADD_EVENT: {
          target: 'addingEvent',
        },
      },
    },
    addingEvent: {
      invoke: {
        id: 'eventAdder',
        src: 'eventAdder',
        onDone: { actions: ['addEvent', 'gotoEvent'], target: 'idle' },
        onError: { actions: 'setError', target: 'idle' },
      },
    },
  },
  onDone: {
    target: 'pages',
  },
};
