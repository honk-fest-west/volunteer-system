import type { VEvent, ShiftSignUp } from '$models';
import type { JobSignUpCollection } from '$types';
import { createMachine, type MachineConfig } from 'xstate';

import { actions } from './event.actions';
import { services } from './event.services';
import { guards } from './event.guards';

export interface EventCtx {
  events: Event[];
  signUps: JobSignUpCollection;
  selectedEventId: string | null;
  selectedEvent: VEvent | null;
  error: string | null;
  autoSaveRef: any;
  eventsLoaderRef: any;
  selectedEventLoaderRef: any;
  signUpsLoaderRef: any;
}

export type EventEvt =
  | { type: 'AT.INDEX'; data: null }
  | { type: 'AT.EVENT'; data: string }
  | { type: 'GOTO.INDEX'; data: null }
  | { type: 'LOAD.EVENTS'; data: Event[] }
  | { type: 'LOAD.SELECTED_EVENT'; data: VEvent }
  | { type: 'LOAD.SIGN_UPS'; data: ShiftSignUp[] }
  | { type: 'LOAD.ERROR'; data: string }
  | { type: 'EVENT.ADD'; data: null }
  | { type: 'EVENT.SELECT'; data: string }
  | { type: 'EVENT.SAVE'; data: null }
  | { type: 'EVENT.ADD_JOB'; data: null }
  | { type: 'EVENT.REMOVE_JOB'; data: string }
  | { type: 'EVENT.ADD_SHIFT'; data: string }
  | { type: 'EVENT.REMOVE_SHIFT'; data: string }
  | { type: 'EVENT.DUPLICATE'; data: string }
  | { type: 'STATUS.CONFIRM'; data: null }
  | { type: 'STATUS.CANCEL'; data: null }
  | { type: 'STATUS.SET_DRAFT'; data: null }
  | { type: 'STATUS.SET_PREVIEW'; data: null }
  | { type: 'STATUS.SET_OPEN'; data: null }
  | { type: 'STATUS.SET_LOCK'; data: null }
  | { type: 'STATUS.SET_ARCHIVE'; data: null }
  | { type: 'done.invoke.eventAdder'; data: string }
  | { type: 'done.invoke.eventDuplicator'; data: string }
  | { type: 'error.invoke.eventAdder'; data: string }
  | { type: 'error.invoke.eventDuplicator'; data: string }
  | { type: 'error.invoke.updatingStatusToDraft'; data: string }
  | { type: 'error.invoke.updatingStatusToPreview'; data: string }
  | { type: 'error.invoke.updatingStatusToOpen'; data: string }
  | { type: 'error.invoke.updatingStatusToLock'; data: string }
  | { type: 'error.invoke.updatingStatusToArchive'; data: string };

const config: MachineConfig<EventCtx, any, EventEvt> = {
  id: 'event',
  initial: 'routing',
  context: {
    events: [],
    signUps: {},
    selectedEventId: null,
    selectedEvent: null,
    error: null,
    autoSaveRef: null,
    eventsLoaderRef: null,
    selectedEventLoaderRef: null,
    signUpsLoaderRef: null,
  },
  states: {
    routing: {
      on: {
        'AT.INDEX': {
          target: 'listingEvents',
        },
        'AT.EVENT': {
          actions: 'setSelectedEventId',
          target: 'loadingSelectedEvent',
        },
      },
    },
    listingEvents: {
      entry: ['spawnEventsLoader', 'clearSelectedEvent'],
      on: {
        'EVENT.ADD': {
          target: 'addingEvent',
        },
        'EVENT.SELECT': {
          actions: ['setSelectedEventId', 'gotoEvent'],
          target: 'loadingSelectedEvent',
        },
        'LOAD.EVENTS': {
          actions: 'setEvents',
        },
        'LOAD.ERROR': {
          actions: 'setError',
        },
      },
      exit: 'stopEventsLoader',
    },
    addingEvent: {
      invoke: {
        id: 'eventAdder',
        src: 'eventAdder',
        onDone: {
          actions: ['setSelectedEventId', 'gotoEvent'],
          target: 'loadingSelectedEvent',
        },
        onError: {
          actions: ['setError', 'gotoIndex'],
          target: 'listingEvents',
        },
      },
    },
    loadingSelectedEvent: {
      entry: 'spawnSelectedEventLoader',
      on: {
        'LOAD.SELECTED_EVENT': {
          actions: 'setSelectedEvent',
          target: 'loadingSignUps',
        },
        'LOAD.ERROR': {
          actions: ['setError', 'gotoIndex'],
          target: 'listingEvents',
        },
      },
      exit: 'stopSelectedEventLoader',
    },
    loadingSignUps: {
      entry: 'spawnSignUpsLoader',
      on: {
        'LOAD.SIGN_UPS': {
          actions: 'setSignUps',
          target: 'determiningEventStatus',
        },
        'LOAD.ERROR': {
          actions: ['setError', 'gotoIndex'],
          target: 'listingEvents',
        },
      },
      exit: 'stopSignUpsLoader',
    },
    determiningEventStatus: {
      always: [
        { target: 'draftingEvent', cond: 'eventStatusIsDraft' },
        { target: 'previewingEvent', cond: 'eventStatusIsPreview' },
        { target: 'openedEvent', cond: 'eventStatusIsOpen' },
        { target: 'lockedEvent', cond: 'eventStatusIsLock' },
        { target: 'archivedEvent', cond: 'eventStatusIsArchive' },
      ],
    },
    draftingEvent: {
      entry: ['setDraftStatus', 'spawnAutoSave'],
      on: {
        'STATUS.SET_PREVIEW': {
          target: 'validatingEvent',
        },
        'EVENT.SAVE': {
          actions: 'saveEvent',
        },
        'EVENT.ADD_JOB': {
          actions: ['clearError', 'addJob', 'saveEvent'],
        },
        'EVENT.REMOVE_JOB': {
          actions: ['clearError', 'removeJob', 'saveEvent'],
        },
        'EVENT.ADD_SHIFT': {
          actions: ['clearError', 'addShift', 'saveEvent'],
        },
        'EVENT.REMOVE_SHIFT': {
          actions: ['clearError', 'removeShift', 'saveEvent'],
        },
        'EVENT.DUPLICATE': {
          target: 'duplicatingEvent',
        },
        'GOTO.INDEX': {
          target: 'listingEvents',
          actions: 'gotoIndex',
        },
      },
      invoke: {
        id: 'updatingStatusToDraft',
        src: 'eventUpdater',
        onError: {
          actions: ['setError', 'gotoIndex'],
          target: 'listingEvents',
        },
      },
      exit: 'stopAutoSave',
    },
    validatingEvent: {
      entry: 'validateEvent',
      always: [
        { target: 'draftingEvent', cond: 'eventIsInvalid' },
        { target: 'previewingEvent', cond: 'eventIsValid' },
      ],
    },
    previewingEvent: {
      entry: 'setPreviewStatus',
      on: {
        'STATUS.SET_DRAFT': {
          target: 'draftingEvent',
        },
        'STATUS.SET_OPEN': {
          target: 'confirmingOpenEvent',
        },
        'EVENT.DUPLICATE': {
          target: 'duplicatingEvent',
        },
        'GOTO.INDEX': {
          target: 'listingEvents',
          actions: 'gotoIndex',
        },
      },
      invoke: {
        id: 'updatingStatusToPreview',
        src: 'eventUpdater',
        onError: {
          actions: ['setError', 'gotoIndex'],
          target: 'listingEvents',
        },
      },
    },
    confirmingOpenEvent: {
      on: {
        'STATUS.CONFIRM': {
          target: 'openedEvent',
        },
        'STATUS.CANCEL': {
          target: 'previewingEvent',
        },
      },
    },
    openedEvent: {
      entry: 'setOpenStatus',
      on: {
        'STATUS.SET_LOCK': {
          target: 'lockedEvent',
        },
        'STATUS.SET_ARCHIVE': {
          target: 'archivedEvent',
        },
        'EVENT.DUPLICATE': {
          target: 'duplicatingEvent',
        },
        'GOTO.INDEX': {
          target: 'listingEvents',
          actions: 'gotoIndex',
        },
      },
      invoke: {
        id: 'updatingStatusToOpen',
        src: 'eventUpdater',
        onError: {
          actions: ['setError', 'gotoIndex'],
          target: 'listingEvents',
        },
      },
    },
    lockedEvent: {
      entry: 'setLockStatus',
      on: {
        'STATUS.SET_OPEN': {
          target: 'openedEvent',
        },
        'STATUS.SET_ARCHIVE': {
          target: 'archivedEvent',
        },
        'EVENT.DUPLICATE': {
          target: 'duplicatingEvent',
        },
        'GOTO.INDEX': {
          target: 'listingEvents',
          actions: 'gotoIndex',
        },
      },
      invoke: {
        id: 'updatingStatusToLock',
        src: 'eventUpdater',
        onError: {
          actions: ['setError', 'gotoIndex'],
          target: 'listingEvents',
        },
      },
    },
    archivedEvent: {
      entry: 'setArchiveStatus',
      on: {
        'STATUS.SET_OPEN': {
          target: 'openedEvent',
        },
        'STATUS.SET_LOCK': {
          target: 'lockedEvent',
        },
        'EVENT.DUPLICATE': {
          target: 'duplicatingEvent',
        },
        'GOTO.INDEX': {
          target: 'listingEvents',
          actions: 'gotoIndex',
        },
      },
      invoke: {
        id: 'updatingStatusToArchive',
        src: 'eventUpdater',
        onError: {
          actions: ['setError', 'gotoIndex'],
          target: 'listingEvents',
        },
      },
    },
    duplicatingEvent: {
      invoke: {
        id: 'eventDuplicator',
        src: 'eventDuplicator',
        onDone: {
          actions: ['setSelectedEventId', 'gotoEvent'],
          target: 'loadingSelectedEvent',
        },
        onError: {
          actions: ['setError', 'gotoIndex'],
          target: 'listingEvents',
        },
      },
    },
  },
};

export const eventMachine = createMachine<EventCtx, EventEvt>(config, {
  actions,
  services,
  guards,
});
