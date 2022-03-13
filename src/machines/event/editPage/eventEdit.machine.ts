import { createMachine, type MachineConfig } from 'xstate';
import type { VEvent, Job, Shift } from '$types';
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
  | { type: 'SET_EVENT_ID'; data: { eventId: string } }
  | { type: 'UPDATE_EVENT' }
  | { type: 'ADD_JOB' }
  | { type: 'DELETE_JOB'; data: { job: Job } }
  | { type: 'ADD_SHIFT'; data: { job: Job } }
  | { type: 'DELETE_SHIFT'; data: { shift: Shift; job: Job } }
  | { type: 'GOTO_INDEX' };

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
        SET_EVENT_ID: {
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
      },
    },
  },
};

export const machine = createMachine<EventEditCtx, EventEditEvt>(config, {
  actions,
  services,
  guards,
});
