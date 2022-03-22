import type { MachineConfig } from 'xstate';
import type { User } from '$types';
import { actions } from './volunteer.actions';

import { createMachine } from 'xstate';

export interface VolunteerCtx {
  volunteers: User[];
  error: string | null;
  volunteersLoaderRef: any;
}

export type VolunteerEvt =
  | { type: 'AT.INDEX'; data: null }
  | { type: 'LOAD.VOLUNTEERS'; data: User[] }
  | { type: 'LOAD.ERROR'; data: string };

const config: MachineConfig<VolunteerCtx, any, VolunteerEvt> = {
  id: 'volunteer',
  initial: 'routing',
  context: {
    volunteers: [],
    error: null,
    volunteersLoaderRef: null,
  },
  states: {
    routing: {
      on: {
        'AT.INDEX': {
          target: 'listingVolunteers',
        },
      },
    },
    listingVolunteers: {
      entry: ['spawnVolunteersLoader'],
      on: {
        'LOAD.VOLUNTEERS': {
          actions: 'setVolunteers',
        },
        'LOAD.ERROR': {
          actions: 'setError',
        },
      },
      exit: 'stopVolunteersLoader',
    },
  },
};

export const volunteerMachine = createMachine<VolunteerCtx, VolunteerEvt>(
  config,
  { actions }
);
