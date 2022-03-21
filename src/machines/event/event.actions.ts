import type { EventCtx, EventEvt } from './event.machine';
import { assign, send, spawn } from 'xstate';
import { stop } from 'xstate/lib/actions';
import { push } from 'svelte-spa-router';
import { autoSaveMachine } from './autoSave.machine';
import {
  createEventsLoader,
  createSelectedEventLoader,
  createSignUpsLoader,
} from './event.loaders';

export const actions = {
  gotoIndex: () => push('/system/events'),
  gotoEvent: (ctx: EventCtx, evt: EventEvt) => {
    if (evt.type !== 'EVENT.SELECT' && evt.type !== 'done.invoke.eventAdder')
      return;
    push(`/system/events/${evt.data}`);
  },

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
  clearSelectedEvent: assign({
    selectedEvent: () => null,
    selectedEventId: () => null,
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

  spawnAutoSave: assign({
    autoSaveRef: ({ selectedEvent }: EventCtx) => {
      return spawn(autoSaveMachine.withContext({ selectedEvent }));
    },
  }),
  stopAutoSave: stop(({ autoSaveRef }: EventCtx) => autoSaveRef),

  spawnEventsLoader: assign({
    eventsLoaderRef: () =>
      spawn(createEventsLoader(['draft', 'preview', 'open', 'lock'])),
  }),
  stopEventsLoader: stop(({ eventsLoaderRef }: EventCtx) => eventsLoaderRef),

  spawnSelectedEventLoader: assign({
    selectedEventLoaderRef: ({ selectedEventId }: EventCtx) =>
      spawn(createSelectedEventLoader(selectedEventId)),
  }),
  stopSelectedEventLoader: stop(
    ({ selectedEventLoaderRef }: EventCtx) => selectedEventLoaderRef
  ),

  spawnSignUpsLoader: assign({
    signUpsLoaderRef: (ctx: EventCtx) =>
      spawn(createSignUpsLoader(ctx.selectedEventId)),
  }),
  stopSignUpsLoader: stop(({ signUpsLoaderRef }: EventCtx) => signUpsLoaderRef),

  saveEvent: send(
    ({ selectedEvent }: EventCtx) => ({
      type: 'EVENT_CHANGED',
      selectedEvent,
    }),
    { to: (ctx: EventCtx) => ctx.autoSaveRef }
  ),

  setDraftStatus: assign({
    selectedEvent: ({ selectedEvent }: EventCtx) => {
      return {
        ...selectedEvent,
        status: 'draft',
      };
    },
  }),

  setPreviewStatus: assign({
    selectedEvent: ({ selectedEvent }: EventCtx) => {
      return {
        ...selectedEvent,
        status: 'preview',
      };
    },
  }),

  setOpenStatus: assign({
    selectedEvent: ({ selectedEvent }: EventCtx) => {
      return {
        ...selectedEvent,
        status: 'open',
      };
    },
  }),

  setLockStatus: assign({
    selectedEvent: ({ selectedEvent }: EventCtx) => {
      return {
        ...selectedEvent,
        status: 'lock',
      };
    },
  }),

  setArchiveStatus: assign({
    selectedEvent: ({ selectedEvent }: EventCtx) => {
      return {
        ...selectedEvent,
        status: 'archive',
      };
    },
  }),

  validateEvent: assign({
    error: ({ selectedEvent: { name, date, jobs } }: EventCtx) => {
      if (!name?.length) {
        return 'Event Name is Required' as string;
      }
      if (!date) {
        return 'Event Date is Required' as string;
      }
      if (!Object.values(jobs || {}).length) {
        return 'At least one Job is Required' as string;
      }
      if (Object.values(jobs || {}).some((job) => !job.name?.length)) {
        return 'Each Job requires a Name' as string;
      }
      if (
        Object.values(jobs || {}).some(
          (job) => !Object.values(job.shifts || {}).length
        )
      ) {
        return 'Each Job requires at least one Shift' as string;
      }
      if (
        Object.values(jobs || {}).some((job) =>
          Object.values(job.shifts || {}).some(
            (shift) => !shift.from || !shift.to
          )
        )
      ) {
        return 'Shift From and To times are Required' as string;
      }
      return null;
    },
  }),

  setError: assign({
    error: (ctx: EventCtx, evt: EventEvt) => {
      console.log('ERROR', evt);
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
