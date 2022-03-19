import { createMachine, type MachineConfig, type StateMachine } from 'xstate';
import { actions } from './shift.actions';
import { guards } from './shift.guards';
import { services } from './shift.services';
import type { ShiftSignUp, VEvent } from '$models';
import type { JobSignUpCollection, User } from '$types';

export interface ShiftCtx {
  user: User;
  events: Event[];
  signUps: JobSignUpCollection;
  selectedEventId: string | null;
  selectedEvent: VEvent | null;
  selectedJobId: string | null;
  error: string | null;
  eventsRef: ReturnType<typeof import('xstate').spawn> | null;
  selectedEventRef: ReturnType<typeof import('xstate').spawn> | null;
  signUpsRef: ReturnType<typeof import('xstate').spawn> | null;
}

export type ShiftEvt =
  | {
      type: 'done.invoke.signUpAdder';
      data: ShiftSignUp;
    }
  | {
      type: 'done.invoke.signUpRemover';
      data: ShiftSignUp;
    }
  | { type: 'INDEX.AT'; data: null }
  | { type: 'INDEX.GOTO_SHOW'; data: string }
  | { type: 'SHOW.AT'; data: string }
  | { type: 'SHOW.GOTO_INDEX'; data: null }
  | { type: 'SHOW.SELECT_JOB'; data: string }
  | { type: 'SHOW.CLEAR_SELECTED_JOB'; data: null }
  | {
      type: 'SHOW.SIGN_UP';
      data: { eventId: string; jobId: string; shiftId: string };
    }
  | {
      type: 'SHOW.UNSIGN_UP';
      data: {
        eventId: string;
        jobId: string;
        shiftId: string;
        signUpId: string;
      };
    }
  | { type: 'EVENTS.UPDATE'; data: VEvent[] }
  | { type: 'SELECTED_EVENT.UPDATE'; data: VEvent }
  | { type: 'SIGN_UPS.UPDATE'; data: ShiftSignUp[] };

export function createShiftMachine(
  user: User
): StateMachine<ShiftCtx, any, ShiftEvt> {
  return createMachine<ShiftCtx, ShiftEvt>(
    {
      id: 'shift',

      context: {
        user,
        events: [],
        signUps: {},
        selectedEvent: null,
        selectedEventId: null,
        selectedJobId: null,
        error: null,
        eventsRef: null,
        selectedEventRef: null,
        signUpsRef: null,
      },

      initial: 'router',
      states: {
        router: {
          on: {
            'INDEX.AT': {
              target: 'index',
            },
            'SHOW.AT': {
              actions: 'setSelectedEventId',
              target: 'show',
            },
          },
        },
        index: {
          entry: 'spawnEventsObservable',
          on: {
            'INDEX.GOTO_SHOW': {
              actions: ['gotoShow', 'setSelectedEventId'],
              target: 'show',
            },
            'EVENTS.UPDATE': {
              actions: 'setEvents',
            },
          },
        },
        show: {
          entry: ['spawnSelectedEventObservable', 'spawnSignUpsObservable'],
          on: {
            'SHOW.GOTO_INDEX': {
              actions: 'gotoIndex',
              target: 'index',
            },
            'SHOW.SELECT_JOB': {
              actions: 'setSelectedJobId',
            },
            'SELECTED_EVENT.UPDATE': {
              actions: 'setSelectedEvent',
            },
            'SIGN_UPS.UPDATE': {
              actions: 'setSignUps',
            },
            'SHOW.SIGN_UP': {
              target: 'signingUp',
            },
            'SHOW.UNSIGN_UP': {
              target: 'unsigningUp',
            },
            'SHOW.CLEAR_SELECTED_JOB': {
              actions: 'clearSelectedJobId',
            },
          },
        },
        signingUp: {
          invoke: {
            id: 'signUpAdder',
            src: 'signUpAdder',
            onDone: {
              target: 'show',
            },
            onError: {
              actions: 'setError',
              target: 'show',
            },
          },
        },
        unsigningUp: {
          invoke: {
            id: 'signUpRemover',
            src: 'signUpRemover',
            onDone: {
              target: 'show',
            },
            onError: {
              actions: 'setError',
              target: 'show',
            },
          },
        },
        updateEvent: {
          invoke: {
            id: 'eventUpdater',
            src: 'eventUpdater',
            onDone: {
              target: 'show',
            },
            onError: {
              actions: 'setError',
              target: 'show',
            },
          },
        },
      },
    },
    {
      actions,
      services,
      guards,
    }
  );
}
