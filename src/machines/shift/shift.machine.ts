import { createMachine, type MachineConfig } from 'xstate';
import type { DocumentData } from 'firebase/firestore';
import { actions } from './shift.actions';
import { guards } from './shift.guards';
import { services } from './shift.services';

export interface ShiftCtx {
  events: Event[];
  selectedEventId: string | null;
  error: string | null;
  eventsRef: any;
}

export type ShiftEvt =
  | { type: 'EVENTS.UPDATE'; data: DocumentData[] }
  | { type: 'SHOW_EVENT'; data: string }
  | { type: 'SELECT_EVENT'; data: string };

const config: MachineConfig<ShiftCtx, any, ShiftEvt> = {
  id: 'shift',

  context: {
    events: [],
    selectedEventId: null,
    error: null,
    eventsRef: null,
  },

  initial: 'idle',
  states: {
    idle: {
      entry: 'spawnEventsObservable',
      on: {
        SHOW_EVENT: {
          actions: 'gotoShowEvent',
        },
        SELECT_EVENT: {
          actions: 'setSelectedEventId',
        },
        'EVENTS.UPDATE': {
          actions: 'setEvents',
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
