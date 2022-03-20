import { createMachine, type MachineConfig } from 'xstate';
import type { VEvent, Job } from '$models';
import type { Shift } from '$types';
import { actions } from './eventEdit.actions';
import { guards } from './eventEdit.guards';
import { services } from './eventEdit.services';

export interface EventEditCtx {
  selectedEventId: string | null;
  selectedEvent: VEvent | null;
  loaded: boolean;
  error: string | null;
  autoSaveRef: any;
}

export type EventEditEvt =
  | { type: 'done.invoke.selectedEventLoader'; data: VEvent }
  | { type: 'done.invoke.eventDuplicator'; data: VEvent }
  | { type: 'EDIT_EVENT'; data: { eventId: string } }
  | { type: 'UPDATE_EVENT'; data: null }
  | { type: 'ADD_JOB'; data: null }
  | { type: 'DELETE_JOB'; data: { job: Job } }
  | { type: 'ADD_SHIFT'; data: { job: Job } }
  | { type: 'DELETE_SHIFT'; data: { shift: Shift; job: Job } }
  | { type: 'DUPLICATE_EVENT'; data: VEvent }
  | { type: 'PREVIEW_EVENT'; data: null }
  | { type: 'PUBLISH_EVENT'; data: null }
  | { type: 'CONFIRM_PUBLISH'; data: null }
  | { type: 'CANCEL_PUBLISH'; data: null }
  | { type: 'GOTO_INDEX'; data: null };

const config: MachineConfig<EventEditCtx, any, EventEditEvt> = {
  id: 'eventEdit',
  initial: 'settingSelectedEvent',
  context: {
    selectedEventId: null,
    selectedEvent: null,
    loaded: false,
    error: null,
    autoSaveRef: null,
  },
  states: {
    settingSelectedEvent: {
      on: {
        EDIT_EVENT: {
          actions: 'setSelectedEventId',
          target: 'loadingSelectedEvent',
        },
      },
    },
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
        DUPLICATE_EVENT: { actions: 'clearError', target: 'duplicatingEvent' },
        PREVIEW_EVENT: { actions: 'clearError', target: 'previewingEvent' },
        PUBLISH_EVENT: {
          actions: 'validateEvent',
          target: 'validatingEvent',
        },
      },
    },
    duplicatingEvent: {
      invoke: {
        id: 'eventDuplicator',
        src: 'eventDuplicator',
        onDone: {
          actions: ['setSelectedEvent', 'gotoEvent'],
          target: 'loadingSelectedEvent',
        },
        onError: { actions: 'setError', target: 'idle' },
      },
    },
    draftingEvent: {
      invoke: {
        id: 'eventDrafter',
        src: 'eventDrafter',
        onDone: { actions: 'draftEvent', target: 'idle' },
        onError: { actions: 'setError', target: 'idle' },
      },
      exit: 'gotoEdit',
    },
    previewingEvent: {
      invoke: {
        id: 'eventPreviewer',
        src: 'eventPreviewer',
        onDone: { actions: 'previewEvent', target: 'idle' },
        onError: { actions: 'setError', target: 'idle' },
      },
      exit: 'gotoShow',
    },
    validatingEvent: {
      always: { target: 'idle', cond: 'eventIsInvalid' },
      on: {
        CONFIRM_PUBLISH: { target: 'publishingEvent' },
        CANCEL_PUBLISH: { target: 'idle' },
      },
    },
    publishingEvent: {
      invoke: {
        id: 'eventPublisher',
        src: 'eventPublisher',
        onDone: { actions: 'publishEvent', target: 'idle' },
        onError: { actions: 'setError', target: 'idle' },
      },
      exit: 'gotoShow',
    },
  },
};

export const machine = createMachine<EventEditCtx, EventEditEvt>(config, {
  actions,
  services,
  guards,
});
