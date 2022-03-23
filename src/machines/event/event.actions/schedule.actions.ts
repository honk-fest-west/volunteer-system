import { assign } from 'xstate';
import type { EventEvt } from '../event.machine';

export const scheduleActions = {
  setSelectedJobId: assign({
    selectedJobId: (_ctx, evt: EventEvt) => evt.data,
  }),
  clearSelectedJobId: assign({
    selectedJobId: (_ctx, evt: EventEvt) => null,
  }),
  prevSchedulePage: assign({
    schedulePage: (ctx: EventCtx) => ctx.schedulePage - 1,
  }),
  nextSchedulePage: assign({
    schedulePage: (ctx: EventCtx) => ctx.schedulePage + 1,
  }),
};
