import { createMachine, type MachineConfig } from 'xstate';
import type { DocumentData, QuerySnapshot } from 'firebase/firestore';
import type { VEvent } from '$models';
import type { EventCollection } from '$types';
import { actions } from './eventIndex.actions';
import { guards } from './eventIndex.guards';
import { services } from './eventIndex.services';

export interface EventIndexCtx {
  events: EventCollection;
  loaded: boolean;
  error: string | null;
}

export type EventIndexEvt =
  | { type: 'done.invoke.eventsLoader'; data: QuerySnapshot<VEvent> }
  | { type: 'done.invoke.eventAdder'; data: VEvent }
  | { type: 'done.invoke.eventDuplicator'; data: VEvent }
  | { type: 'ADD_EVENT' }
  | { type: 'DUPLICATE_EVENT'; data: VEvent }
  | { type: 'SELECT_EVENT'; data: VEvent };

export const config: MachineConfig<EventIndexCtx, any, EventIndexEvt> = {
  id: 'eventIndex',

  context: {
    events: {},
    loaded: false,
    error: null,
  },
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
          actions: 'gotoEvent',
        },
        ADD_EVENT: {
          target: 'addingEvent',
        },
        DUPLICATE_EVENT: {
          target: 'duplicatingEvent',
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
    duplicatingEvent: {
      invoke: {
        id: 'eventDuplicator',
        src: 'eventDuplicator',
        onDone: { actions: 'gotoEvent', target: 'idle' },
        onError: { actions: 'setError', target: 'idle' },
      },
    },
  },
};

export const machine = createMachine<EventIndexCtx, EventIndexEvt>(config, {
  actions,
  services,
  guards,
});
