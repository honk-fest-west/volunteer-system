import { createMachine, type MachineConfig } from 'xstate';
import { actions } from './eventShow.actions';
import { services } from './eventShow.services';
import { guards } from './eventShow.guards';

import type { ShiftSignUp, VEvent } from '$models';

import type { JobSignUpCollection } from '$types';
import type { DocumentData, QuerySnapshot } from 'firebase/firestore';

export interface EventShowCtx {
  selectedEventId: string | null;
  selectedEvent: VEvent | null;
  signUps: JobSignUpCollection;
  error: string | null;
  signUpsRef: ReturnType<typeof import('xstate').spawn> | null;
}

export type EventShowEvt =
  | {
      type: 'done.invoke.shiftSignUpsLoader';
      data: QuerySnapshot<DocumentData>;
    }
  | { type: 'done.invoke.selectedEventLoader'; data: VEvent }
  | { type: 'done.invoke.eventDuplicator'; data: VEvent }
  | { type: 'SHOW_EVENT'; data: { eventId: string } }
  | { type: 'DUPLICATE_EVENT'; data: VEvent }
  | { type: 'DRAFT_EVENT'; data: null }
  | { type: 'OPEN_EVENT' }
  | { type: 'LOCK_EVENT'; data: VEvent }
  | { type: 'ARCHIVE_EVENT' }
  | { type: 'CONFIRM_STATUS_CHANGE' }
  | { type: 'CANCEL_STATUS_CHANGE' }
  | { type: 'GOTO_INDEX' }
  | { type: 'SIGN_UPS.UPDATE'; data: ShiftSignUp[] };

const config: MachineConfig<EventShowCtx, any, EventShowEvt> = {
  id: 'eventShow',
  initial: 'settingSelectedEvent',
  context: {
    selectedEventId: null,
    selectedEvent: null,
    signUps: null,
    error: null,
    signUpsRef: null,
  },
  states: {
    settingSelectedEvent: {
      on: {
        SHOW_EVENT: {
          actions: 'setSelectedEventId',
          target: 'loadingSelectedEvent',
        },
      },
    },
    loadingSelectedEvent: {
      invoke: {
        id: 'selectedEventLoader',
        src: 'selectedEventLoader',
        onDone: {
          actions: 'setSelectedEvent',
          target: 'idle',
        },
        onError: { actions: 'setError', target: 'idle' },
      },
    },
    idle: {
      entry: 'spawnSignUpsObservable',
      on: {
        DRAFT_EVENT: { actions: 'clearError', target: 'draftingEvent' },
        OPEN_EVENT: {
          target: 'publishingEvent',
        },
        LOCK_EVENT: {
          target: 'lockingEvent',
        },
        ARCHIVE_EVENT: {
          target: 'confirmingArchiveEvent',
        },
        GOTO_INDEX: {
          actions: 'gotoIndex',
        },
        'SIGN_UPS.UPDATE': {
          actions: 'setSignUps',
        },
      },
    },

    publishingEvent: {
      invoke: {
        id: 'eventPublisher',
        src: 'eventPublisher',
        onDone: { actions: 'setSelectedEvent', target: 'idle' },
        onError: { actions: 'setError', target: 'idle' },
      },
    },

    lockingEvent: {
      always: { target: 'idle', cond: 'eventIsLockedOrArchived' },
      invoke: {
        id: 'eventLocker',
        src: 'eventLocker',
        onDone: { actions: 'setSelectedEvent', target: 'idle' },
        onError: { actions: 'setError', target: 'idle' },
      },
    },

    confirmingArchiveEvent: {
      always: { target: 'idle', cond: 'eventIsArchived' },
      on: {
        CONFIRM_STATUS_CHANGE: {
          target: 'archivingEvent',
        },
        CANCEL_STATUS_CHANGE: {
          target: 'idle',
        },
      },
    },

    archivingEvent: {
      invoke: {
        id: 'eventArchiver',
        src: 'eventArchiver',
        onDone: { actions: 'setSelectedEvent', target: 'idle' },
        onError: { actions: 'setError', target: 'idle' },
      },
    },
  },
};

export const machine = createMachine<EventShowCtx, EventShowEvt>(config, {
  actions,
  services,
  guards,
});
