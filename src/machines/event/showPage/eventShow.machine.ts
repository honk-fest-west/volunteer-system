import { createMachine, type MachineConfig } from 'xstate';

import type { VEvent, VolunteerJobShiftsCollection } from '$types';

export interface EventShowCtx {
  selectedEventId: string | null;
  selectedEvent: VEvent | null;
  volunteerJobShifts: VolunteerJobShiftsCollection;
  error: string | null;
}

export type EventShowEvt =
  | { type: 'SHOW_EVENT'; data: { eventId: string } }
  | { type: 'LOAD_JOB'; data: { jobId: string } }
  | { type: 'LOCK_EVENT' }
  | { type: 'OPEN_EVENT' }
  | { type: 'ARCHIVE_EVENT' }
  | { type: 'CONFIRM_STATUS_CHANGE' }
  | { type: 'CANCEL_STATUS_CHANGE' };

const config: MachineConfig<EventShowCtx, any, EventShowEvt> = {
  id: 'eventShow',
  initial: 'settingSelectedEvent',
  context: {
    selectedEventId: null,
    selectedEvent: null,
    volunteerJobShifts: {},
    error: null,
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
      on: {
        LOAD_JOB: {
          target: 'loadingJob',
        },
        OPEN_EVENT: {
          target: 'confirmingUnlockEvent',
        },
        LOCK_EVENT: {
          target: 'confirmingLockEvent',
        },
        ARCHIVE_EVENT: {
          target: 'confirmingArchiveEvent',
        },
      },
    },

    loadingJob: {
      always: { target: 'idle', cond: 'jobIsLoaded' },
      invoke: {
        id: 'jobLoader',
        src: 'jobLoader',
        onDone: { actions: 'setJob', target: 'idle' },
        onError: { actions: 'setError', target: 'idle' },
      },
    },

    confirmingLockEvent: {
      always: { target: 'idle', cond: 'eventIsLockedOrArchived' },
      on: {
        CONFIRM_STATUS_CHANGE: {
          target: 'lockingEvent',
        },
        CANCEL_STATUS_CHANGE: {
          target: 'idle',
        },
      },
    },

    confirmingUnlockEvent: {
      always: { target: 'idle', cond: 'eventIsUnlockedOrArchived' },
      on: {
        CONFIRM_STATUS_CHANGE: {
          target: 'unlockingEvent',
        },
        CANCEL_STATUS_CHANGE: {
          target: 'idle',
        },
      },
    },

    confirmingArchiveEvent: {
      always: { target: 'idle', cond: 'eventIsUnlockedOrArchived' },
      on: {
        CONFIRM_STATUS_CHANGE: {
          target: 'archivingEvent',
        },
        CANCEL_STATUS_CHANGE: {
          target: 'idle',
        },
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

    unlockingEvent: {
      invoke: {
        id: 'eventLocker',
        src: 'eventLocker',
        onDone: { actions: 'setSelectedEvent', target: 'idle' },
        onError: { actions: 'setError', target: 'idle' },
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

export const machine = createMachine<EventShowCtx, EventShowEvt>(config);
