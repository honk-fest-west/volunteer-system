import type { ShiftSignUp } from '$models';
import { push } from 'svelte-spa-router';
import { assign } from 'xstate';
import type { EventShowCtx, EventShowEvt } from './eventShow.machine';

export const actions = {
  gotoIndex: () => push('/system/events'),
  setSelectedEventId: assign({
    selectedEventId: (ctx: EventShowCtx, evt: EventShowEvt) => {
      if (evt.type !== 'SHOW_EVENT') return ctx.selectedEventId;
      return evt.data.eventId;
    },
  }),
  setSelectedEvent: assign({
    selectedEvent: (ctx: EventShowCtx, evt: EventShowEvt) => {
      if (
        evt.type !== 'done.invoke.selectedEventLoader' &&
        evt.type !== 'done.invoke.eventDuplicator'
      )
        return ctx.selectedEvent;
      const { data } = evt;
      return data;
    },
  }),
  setSignUps: assign({
    signUps: (ctx: EventShowCtx, evt: EventShowEvt) => {
      if (evt.type !== 'done.invoke.shiftSignUpsLoader') return ctx.signUps;
      const { docs } = evt.data;
      return docs.reduce((acc, doc) => {
        const signUp = doc.data() as ShiftSignUp;
        const jobShifts = acc[signUp.jobId] || [];
        acc[signUp.jobId] = [...jobShifts, signUp];
        return acc;
      }, {});
    },
  }),
  setError: assign({
    error: (_, evt: EventShowEvt) => console.log({ setError: evt }),
  }),
};
