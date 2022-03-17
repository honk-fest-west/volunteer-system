import { createMachine, type MachineConfig } from 'xstate';
import type { DocumentData } from 'firebase/firestore';
import { actions } from './shift.actions';
import { guards } from './shift.guards';
import { services } from './shift.services';
import type { VEvent } from '$models';

export interface ShiftCtx {
  events: Event[];
  selectedEventId: string | null;
  selectedEvent: VEvent | null;
  error: string | null;
  eventsRef: any;
  selectedEventRef: any;
}

export type ShiftEvt =
  | { type: 'INDEX.AT' }
  | { type: 'INDEX.GOTO_SHOW'; data: string }
  | { type: 'SHOW.AT'; data: string }
  | { type: 'SHOW.GOTO_INDEX' }
  | { type: 'EVENTS.UPDATE'; data: DocumentData[] }
  | { type: 'SELECTED_EVENT.UPDATE'; data: VEvent };

const config: MachineConfig<ShiftCtx, any, ShiftEvt> = {
  id: 'shift',

  context: {
    events: [],
    selectedEvent: null,
    selectedEventId: null,
    error: null,
    eventsRef: null,
    selectedEventRef: null,
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
      entry: 'spawnSelectedEventObservable',
      on: {
        'SHOW.GOTO_INDEX': {
          actions: 'gotoIndex',
          target: 'index',
        },
        'SELECTED_EVENT.UPDATE': {
          actions: 'setSelectedEvent',
        },
      },
    },
  },
};

export const machine = createMachine<ShiftCtx, ShiftEvt>(config, {
  actions,
  services,
  guards,
});
