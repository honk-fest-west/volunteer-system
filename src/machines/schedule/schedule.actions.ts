import type { ScheduleCtx, ScheduleEvt } from './schedule.machine';
import { assign, spawn } from 'xstate';
import { createScheduleLoader } from './schedule.loader';

export const actions = {
  spawnScheduleLoader: assign({
    scheduleLoaderRef: (ctx: ScheduleCtx) =>
      spawn(createScheduleLoader(ctx.user.uid)),
  }),
  setSchedule: assign({
    schedule: (ctx: ScheduleCtx, evt: ScheduleEvt) => {
      if (evt.type !== 'LOAD.SCHEDULE') return ctx.schedule;
      return evt.data;
    },
    error: (ctx: ScheduleCtx, evt: ScheduleEvt) => {
      if (evt.type !== 'LOAD.ERROR') return ctx.error;
      return evt.data;
    },
  }),
};
