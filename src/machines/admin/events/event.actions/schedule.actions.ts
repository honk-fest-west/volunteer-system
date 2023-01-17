import { assign } from 'xstate';
import type { EventCtx, EventEvt } from '../event.machine';

export const scheduleActions = {
  setSelectedJobShiftIds: assign({
    selectedJobId: (ctx: EventCtx, evt: EventEvt) => {
      if (evt.type !== 'SCHEDULE.SHOW_INFO') return ctx.selectedJobId;
      return evt.data.jobId;
    },
    selectedShiftIds: (ctx: EventCtx, evt: EventEvt) => {
      if (evt.type !== 'SCHEDULE.SHOW_INFO') return ctx.selectedShiftIds;
      return evt.data.shiftIds;
    },
  }),
  clearSelectedJobShiftIds: assign({
    selectedJobId: (_ctx, evt: EventEvt) => null,
  }),
  prevSchedulePage: assign({
    schedulePage: (ctx: EventCtx) => ctx.schedulePage - 1,
  }),
  nextSchedulePage: assign({
    schedulePage: (ctx: EventCtx) => ctx.schedulePage + 1,
  }),
};
