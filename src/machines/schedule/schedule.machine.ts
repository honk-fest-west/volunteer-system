import type { VEvent } from '$models';
import type { User } from '$types';
import { createMachine, type StateMachine } from 'xstate';
import { actions } from './schedule.actions';

export interface ScheduleCtx {
  user: User;
  schedule: VEvent[];
  error: string | null;
  scheduleLoaderRef: any;
}

export type ScheduleEvt =
  | {
      type: 'LOAD.SCHEDULE';
      data: VEvent[];
    }
  | {
      type: 'LOAD.ERROR';
      data: string;
    };

export function createScheduleMachine(
  user: User
): StateMachine<ScheduleCtx, any, ScheduleEvt> {
  return createMachine<ScheduleCtx, ScheduleEvt>(
    {
      id: 'schedule',
      context: {
        user,
        schedule: [],
        error: null,
        scheduleLoaderRef: null,
      },
      initial: 'idle',
      entry: 'spawnScheduleLoader',
      states: {
        idle: {
          on: {
            'LOAD.SCHEDULE': {
              actions: 'setSchedule',
            },
            'LOAD.ERROR': {
              actions: 'setError',
            },
          },
        },
      },
    },
    { actions }
  );
}
