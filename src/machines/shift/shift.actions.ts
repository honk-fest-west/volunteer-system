import type { ShiftCtx, ShiftEvt } from './shift.machine';
import { stop, send } from 'xstate/lib/actions';
import { createEventsObservable } from '$machines/events.observable';
import { createSelectedEventObservable } from '$machines/selectedEvent.observable';
import { push } from 'svelte-spa-router';
import { assign, spawn } from 'xstate';
import { createSignUpsObservable } from '$machines/signUps.observable';
import { commentSaverMachine } from './commentSaver.machine';

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

  spawnCommentSaver: assign({
    commentSaverRef: ({ selectedEventId }: ShiftCtx) => {
      return spawn(
        commentSaverMachine.withContext({
          selectedEventId,
          data: { comment: null, signUpId: null },
        })
      );
    },
  }),
  stopCommentSaver: stop(({ commentSaverRef }: ShiftCtx) => commentSaverRef),
  saveComment: send(
    (_, evt: ShiftEvt) => {
      if (evt.type !== 'SIGN_UP.COMMENT') return;
      return {
        type: 'COMMENT_CHANGED',
        data: evt.data,
      };
    },
    { to: (ctx: ShiftCtx) => ctx.commentSaverRef }
  ),

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
