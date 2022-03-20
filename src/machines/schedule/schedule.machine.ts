import type { VEvent } from '$models';
import type { User } from '$types';
import { createMachine, type StateMachine } from 'xstate';
import { services } from './schedule.services';
import { actions } from './schedule.actions';

export interface ScheduleCtx {
  user: User;
  schedule: VEvent[];
  error: string | null;
}

export type ScheduleEvt = {
  type: 'done.invoke.scheduleLoader';
  data: VEvent[];
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
      },
      initial: 'loading',
      states: {
        loading: {
          invoke: {
            id: 'scheduleLoader',
            src: 'scheduleLoader',
            onDone: {
              actions: 'setSchedule',
              target: 'idle',
            },
            onError: {
              actions: 'setError',
            },
          },
        },
        idle: {},
      },
    },
    { services, actions }
  );
}
