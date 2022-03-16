import { createMachine, type MachineConfig } from 'xstate';
import type { DocumentData, QuerySnapshot } from 'firebase/firestore';
import type { EventCollection, VEvent } from '$types';
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
  | { type: 'SHOW_EVENT'; data: { eventId: string } }
  | { type: 'SELECT_EVENT'; data: { eventId: string } };

const config: MachineConfig<ShiftCtx, any, ShiftEvt> = {
  id: 'shift',

  context: {
    events: [],
    selectedEventId: null,
    error: null,
    eventsRef: null,
  },
  entry: 'spawnEventsObservable',
  initial: 'idle',
  states: {
    idle: {
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
