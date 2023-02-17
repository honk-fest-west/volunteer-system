import type { VolunteerCtx, VolunteerEvt } from './volunteer.machine';
import { assign, spawn } from 'xstate';
import { stop } from 'xstate/lib/actions';
import { createVolunteersLoader } from './volunteer.loaders';

export const actions = {
  spawnVolunteersLoader: assign({
    volunteersLoaderRef: () => spawn(createVolunteersLoader()),
  }),
  stopVolunteersLoader: stop(
    ({ volunteersLoaderRef }: VolunteerCtx) => volunteersLoaderRef
  ),

  setVolunteers: assign({
    volunteers: (ctx: VolunteerCtx, evt: VolunteerEvt) => {
      if (evt.type !== 'LOAD.VOLUNTEERS') return ctx.volunteers;
      return evt.data;
    },
  }),
};
