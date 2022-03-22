import type { EventCtx, EventEvt } from '../event.machine';
import { assign } from 'xstate';
import { draftActions } from './draft.actions';
import { gotoActions } from './goto.actions';
import { spawnActions } from './spawn.actions';
import { statusActions } from './status.actions';

export const actions = {
  ...draftActions,
  ...gotoActions,
  ...spawnActions,
  ...statusActions,

  setEvents: assign({
    events: (ctx: EventCtx, evt: EventEvt) => {
      if (evt.type !== 'LOAD.EVENTS') return ctx.events;
      return evt.data;
    },
  }),

  setSelectedEventId: assign({
    selectedEventId: (ctx: EventCtx, evt: EventEvt) => {
      if (
        evt.type !== 'AT.EVENT' &&
        evt.type !== 'EVENT.SELECT' &&
        evt.type !== 'done.invoke.eventDuplicator' &&
        evt.type !== 'done.invoke.eventAdder'
      )
        return ctx.selectedEventId;

      return evt.data;
    },
  }),

  setSelectedEvent: assign({
    selectedEvent: (ctx: EventCtx, evt: EventEvt) => {
      if (evt.type !== 'LOAD.SELECTED_EVENT') return ctx.selectedEvent;
      return evt.data;
    },
  }),

  setSignUps: assign({
    signUps: (ctx: EventCtx, evt: EventEvt) => {
      if (evt.type !== 'LOAD.SIGN_UPS') return ctx.signUps;
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

  clearSelectedEvent: assign({
    selectedEventId: () => null,
    selectedEvent: () => null,
    signUps: () => {},
  }),

  setError: assign({
    error: (ctx: EventCtx, evt: EventEvt) => {
      if (
        evt.type !== 'LOAD.ERROR' &&
        evt.type !== 'error.invoke.eventDuplicator' &&
        evt.type !== 'error.invoke.updatingStatusToDraft' &&
        evt.type !== 'error.invoke.updatingStatusToPreview' &&
        evt.type !== 'error.invoke.updatingStatusToOpen' &&
        evt.type !== 'error.invoke.updatingStatusToLock' &&
        evt.type !== 'error.invoke.updatingStatusToArchive'
      )
        return ctx.error;

      return evt.data;
    },
  }),

  clearError: assign({
    error: () => null,
  }),
};
