import type { ShiftCtx, ShiftEvt } from './shift.machine';
import { stop } from 'xstate/lib/actions';
import { createEventsObservable } from '$machines/events.observable';
import { createSelectedEventObservable } from '$machines/selectedEvent.observable';
import { push } from 'svelte-spa-router';
import { assign, spawn } from 'xstate';
import { createSignUpsObservable } from '$machines/signUps.observable';

export const actions = {
  spawnEventsObservable: assign({
    eventsRef: () => spawn(createEventsObservable(['open'])),
  }),
  stopEventsObservable: stop(({ eventsRef }: ShiftCtx) => eventsRef),

  spawnSelectedEventObservable: assign({
    selectedEventRef: (ctx: ShiftCtx) =>
      spawn(createSelectedEventObservable(ctx.selectedEventId)),
  }),
  stopSelectedEventObservable: stop(
    ({ selectedEventRef }: ShiftCtx) => selectedEventRef
  ),

  spawnSignUpsObservable: assign({
    signUpsRef: (ctx: ShiftCtx) =>
      spawn(createSignUpsObservable(ctx.selectedEventId, ctx.user.uid)),
  }),
  stopSignUpsObservable: stop(({ signUpsRef }: ShiftCtx) => signUpsRef),

  setSelectedEventId: assign({
    selectedEventId: (ctx: ShiftCtx, evt: ShiftEvt) => {
      if (evt.type !== 'SHOW.AT' && evt.type !== 'INDEX.GOTO_SHOW')
        return ctx.selectedEventId;
      return evt.data;
    },
  }),
  setSelectedEvent: assign({
    selectedEvent: (ctx: ShiftCtx, evt: ShiftEvt) => {
      if (evt.type !== 'SELECTED_EVENT.UPDATE') return ctx.selectedEvent;
      return evt.data;
    },
  }),
  setEvents: assign({
    events: (ctx: ShiftCtx, evt: ShiftEvt) => {
      if (evt.type !== 'EVENTS.UPDATE') return ctx.events;
      return evt.data;
    },
  }),
  setSignUps: assign({
    signUps: (ctx: ShiftCtx, evt: ShiftEvt) => {
      if (evt.type !== 'SIGN_UPS.UPDATE') return ctx.signUps;
      const signUps = evt.data;
      return signUps.reduce((acc, signUp) => {
        const job = acc[signUp.jobId] || {};
        const shift = job[signUp.shiftId] || {};
        const signUps = shift.signUps || [];
        const newAcc = {
          ...acc,
          [signUp.jobId]: {
            ...job,
            [signUp.shiftId]: [...signUps, signUp],
          },
        };
        return newAcc;
      }, {});
    },
  }),
  setSelectedJobId: assign({
    selectedJobId: (ctx: ShiftCtx, evt: ShiftEvt) => {
      if (evt.type !== 'SHOW.SELECT_JOB') return ctx.selectedJobId;
      return evt.data;
    },
  }),
  clearSelectedJobId: assign({
    selectedJobId: () => {
      return null;
    },
  }),
  gotoShow: (ctx: ShiftCtx, evt: ShiftEvt) => {
    if (evt.type !== 'INDEX.GOTO_SHOW') return;
    const id = evt.data;
    push(`/system/shifts/${id}`);
  },
  gotoIndex: () => {
    push('/system/shifts');
  },
};
