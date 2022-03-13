import { createMachine, type MachineConfig } from 'xstate';
import type { DocumentData, QuerySnapshot } from 'firebase/firestore';
import type { EventCollection, VEvent } from '$types';
import { actions } from './eventIndex.actions';
import { guards } from './eventIndex.guards';
import { services } from './eventIndex.services';

export interface EventIndexCtx {
  events: EventCollection;
  loaded: boolean;
  error: string | null;
}

export type EventIndexEvt =
  | { type: 'done.invoke.eventsLoader'; data: QuerySnapshot<DocumentData> }
  | { type: 'done.invoke.eventAdder'; data: VEvent }
  | { type: 'ADD_EVENT' }
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
};

export const machine = createMachine<EventIndexCtx, EventIndexEvt>(config, {
  actions,
  services,
  guards,
});
