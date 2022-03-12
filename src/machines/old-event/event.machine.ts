import type { VEvent, Job, Shift, User } from '$types';
import { actions } from './event.actions';
import { services } from './event.services';
import { guards } from './event.guards';
import { createMachine, actions as xstateActions } from 'xstate';

const { log } = xstateActions;

export interface EventCtx {
  events: VEvent[] | null;
  selectedEvent: VEvent | null;
  error: string | null;
  autoSaveRef: any;
}

export type EventEvt =
  | { type: 'LOAD_EVENTS'; data: unknown }
  | { type: 'ADD_EVENT'; data: unknown }
  | { type: 'EDIT_EVENT'; data: unknown }
  | { type: 'UPDATE_EVENT'; data: unknown }
  | { type: 'DUPLICATE_EVENT'; data: unknown }
  | { type: 'ADD_JOB'; data: unknown }
  | { type: 'DELETE_JOB'; data: unknown }
  | { type: 'ADD_SHIFT'; data: unknown }
  | { type: 'DELETE_SHIFT'; data: unknown }
  | { type: 'STATUS_OPEN'; data: unknown }
  | { type: 'STATUS_LOCKED'; data: unknown }
  | { type: 'STATUS_ARCHIVED'; data: unknown }
  | { type: 'CLOSE_EVENT'; data: unknown }
  | { type: 'CONFIRM'; data: unknown }
  | { type: 'CANCEL'; data: unknown };

type EventState =
  | { value: 'idle'; context: EventCtx }
  | { value: 'loadingEvent'; context: EventCtx }
  | { value: 'loadingEvents'; context: EventCtx }
  | { value: 'addingEvent'; context: EventCtx }
  | { value: 'editingEvent'; context: EventCtx }
  | { value: 'updatingEvent'; context: EventCtx }
  | { value: 'duplicatingEvent'; context: EventCtx }
  | { value: 'validatingEvent'; context: EventCtx };

const config = {
  schema: {
    context: {} as EventCtx,
    events: {} as EventEvt,
    services: {} as {
      eventsLoader: {
        data: VEvent[];
      };
    },
  },
  id: 'event',
  initial: 'idle',
  context: {
    events: [] as VEvent[],
    selectedEvent: null,
    error: null,
    autoSaveRef: null,
  },
  states: {
    idle: {
      on: {
        LOAD_EVENTS: { target: 'loadingEvents' },
        ADD_EVENT: { target: 'addingEvent' },
        EDIT_EVENT: { target: 'loadingEvent' },
        DUPLICATE_EVENT: { target: 'duplicatingEvent' },
      },
    },
    loadingEvent: {
      invoke: {
        id: 'eventLoader',
        src: 'eventLoader',
        onDone: { actions: 'selectEvent', target: 'editingEvent' },
      },
    },
    loadingEvents: {
      invoke: {
        id: 'eventsLoader',
        src: 'eventsLoader',
        onDone: { actions: 'setEvents', target: 'idle' },
        onError: { actions: 'setError' },
      },
    },
    addingEvent: {
      invoke: {
        id: 'eventAdder',
        src: 'eventAdder',
        onDone: {
          actions: 'addEvent',
          target: 'editingEvent',
        },
        onError: { actions: 'setError', target: 'idle' },
      },
    },
    editingEvent: {
      entry: 'initAutoSave',
      on: {
        DUPLICATE_EVENT: { actions: 'clearError', target: 'duplicatingEvent' },
        UPDATE_EVENT: {
          actions: ['clearError', 'updateEvent'],
        },
        ADD_JOB: {
          actions: ['clearError', 'addJob', 'updateEvent'],
        },
        DELETE_JOB: {
          actions: ['clearError', 'deleteJob', 'updateEvent'],
        },
        ADD_SHIFT: {
          actions: ['clearError', 'addShift', 'updateEvent'],
        },
        DELETE_SHIFT: {
          actions: ['clearError', 'deleteShift', 'updateEvent'],
        },
        CLOSE_EVENT: {
          actions: ['clearError', 'updateEvent'],
          target: 'idle',
        },
        STATUS_OPEN: {
          actions: ['validateEvent'],
          target: 'validatingEvent',
        },
      },
    },
    validatingEvent: {
      always: {
        actions: log('ALSWAYS'),
        target: 'editingEvent',
        cond: 'eventIsInvalid',
      },
      on: {
        CONFIRM: { actions: log('CONFIRM'), target: 'openingEvent' },
        CANCEL: { actions: log('CANCEL'), target: 'editingEvent' },
      },
    },
    duplicatingEvent: {
      invoke: {
        id: 'eventDuplicator',
        src: 'eventDuplicator',
        onDone: { actions: 'addEvent', target: 'editingEvent' },
        onError: { actions: 'setError', target: 'idle' },
      },
    },
    openingEvent: {
      entry: log('OPENING_EVENT'),
      invoke: {
        id: 'eventOpener',
        src: 'eventOpener',
        onDone: { actions: 'openEvent', target: 'editingEvent' },
        onError: { actions: 'setError', target: 'editingEvent' },
      },
      exit: ['updateEvent'],
    },
  },
};

export const eventMachine = createMachine<EventCtx, EventEvt, EventState>(
  config,
  {
    actions,
    services,
    guards,
  }
);
