import { assign } from 'xstate';
import type { ScheduleCtx, ScheduleEvt } from './schedule.machine';

export const actions = {
  setSchedule: assign({
    schedule: (ctx: ScheduleCtx, evt: ScheduleEvt) => {
      if (evt.type !== 'done.invoke.scheduleLoader') return ctx.schedule;
      return evt.data;
    },
  }),
};
