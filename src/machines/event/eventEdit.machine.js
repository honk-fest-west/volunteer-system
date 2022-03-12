import { createMachine, actions as xstateActions } from 'xstate';

const { log } = xstateActions;

export const editPage = {
  initial: 'loadEvent',
  states: {
    idle: {
      always: {
        target: 'loadEvent',
        cond: 'eventNotLoaded',
      },
      on: {
        DUPLICATE_EVENT: { actions: 'clearError', target: 'duplicatingEvent' },
        UPDATE_EVENT: {
          actions: ['clearError', 'updateEvents', 'updateEvent'],
        },
        ADD_JOB: {
          actions: ['clearError', 'addJob', 'updateEvents', 'updateEvent'],
        },
        DELETE_JOB: {
          actions: ['clearError', 'deleteJob', 'updateEvents', 'updateEvent'],
        },
        ADD_SHIFT: {
          actions: ['clearError', 'addShift', 'updateEvents', 'updateEvent'],
        },
        DELETE_SHIFT: {
          actions: ['clearError', 'deleteShift', 'updateEvents', 'updateEvent'],
        },
        CLOSE_EVENT: {
          actions: ['clearError', 'updateEvents', 'updateEvent'],
          target: 'listingEvents',
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
        CONFIRM: { actions: log('CONFIRM'), target: 'activatingEvent' },
        CANCEL: { actions: log('CANCEL'), target: 'editingEvent' },
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
      exit: ['updateEvents', 'updateEvent'],
    },
  },
};
