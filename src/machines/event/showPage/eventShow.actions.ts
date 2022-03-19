import type { EventShowCtx, EventShowEvt } from './eventShow.machine';
import type { ShiftSignUp } from '$models';
import { push } from 'svelte-spa-router';
import { assign, spawn } from 'xstate';
import { createSignUpsObservable } from '$machines/signUps.observable';

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
      if (evt.type !== 'SIGN_UPS.UPDATE') return ctx.signUps;
      const signUps = evt.data;
      return signUps.reduce((acc, signUp) => {
        const job = acc[signUp.jobId] || {};
        const shiftSignUps = job[signUp.shiftId] || [];
        acc[signUp.jobId] = {
          ...job,
          [signUp.shiftId]: [...shiftSignUps, { ...signUp }],
        };
        return acc;
      }, {});
    },
  }),
  setError: assign({
    error: (_, evt: EventShowEvt) => console.log({ setError: evt }),
  }),
  spawnSignUpsObservable: assign({
    signUpsRef: (ctx: EventShowCtx) =>
      spawn(createSignUpsObservable(ctx.selectedEventId)),
  }),
};
