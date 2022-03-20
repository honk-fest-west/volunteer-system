import { Timestamp } from 'firebase/firestore';
import { push } from 'svelte-spa-router';
import { assign, send, spawn } from 'xstate';
import { v4 as uuidv4 } from 'uuid';
import type { EventEditCtx, EventEditEvt } from './eventEdit.machine';
import { autoSaveMachine } from './autoSave.machine';
import type { Shift } from '$types';
import { sharedActions } from '../shared.actions';
import { Job } from '$models';

export const actions = {
  ...sharedActions,
  gotoIndex: () => push('/system/events'),
  gotoShow: (ctx: EventEditCtx) =>
    push(`/system/events/${ctx.selectedEventId}`),

  setSelectedEventId: assign({
    selectedEventId: (ctx: EventEditCtx, evt: EventEditEvt) => {
      if (evt.type !== 'EDIT_EVENT') return ctx.selectedEventId;
      return evt.data.eventId;
    },
  }),
  setSelectedEvent: assign({
    selectedEvent: (ctx: EventEditCtx, evt: EventEditEvt) => {
      if (
        evt.type !== 'done.invoke.selectedEventLoader' &&
        evt.type !== 'done.invoke.eventDuplicator'
      )
        return ctx.selectedEvent;
      const { data } = evt;
      return data;
    },
    loaded: true,
  }),
  setError: assign({
    error: (_, evt: EventEditEvt) => console.log({ setError: evt }),
  }),

  initAutoSave: assign({
    autoSaveRef: ({ selectedEvent }: EventEditCtx) => {
      return spawn(autoSaveMachine.withContext({ selectedEvent }));
    },
  }),
  clearError: assign({
    error: () => null,
  }),
  updateEvent: send(
    ({ selectedEvent }: EventEditCtx) => ({
      type: 'EVENT_CHANGED',
      selectedEvent,
    }),
    { to: (ctx: EventEditCtx) => ctx.autoSaveRef }
  ),
  addJob: assign({
    selectedEvent: (ctx: EventEditCtx) => {
      const { selectedEvent } = ctx;
      const job = new Job();
      const { jobs } = selectedEvent;
      return {
        ...selectedEvent,
        jobs: { ...jobs, [job.id]: { ...job } },
      };
    },
  }),
  deleteJob: assign({
    selectedEvent: (ctx: EventEditCtx, evt: EventEditEvt) => {
      if (evt.type !== 'DELETE_JOB') return ctx.selectedEvent;
      const { id } = evt.data.job;
      const jobs = { ...ctx.selectedEvent.jobs };
      delete jobs[id];
      return { ...ctx.selectedEvent, jobs };
    },
  }),
  addShift: assign({
    selectedEvent: (ctx: EventEditCtx, evt: EventEditEvt) => {
      if (evt.type !== 'ADD_SHIFT') return ctx.selectedEvent;
      const id = uuidv4();
      const { selectedEvent } = ctx;
      const job = evt.data.job as Job;
      const createdAt = Timestamp.now();
      const shift = {
        id,
        createdAt,
        slots: 1,
        signedUp: 0,
        from: null,
        to: null,
        location: null,
      } as Shift;
      const shifts = job.shifts;
      return {
        ...selectedEvent,
        jobs: {
          ...selectedEvent.jobs,
          [job.id]: { ...job, shifts: { ...shifts, [shift.id]: shift } },
        },
      };
    },
  }),
  deleteShift: assign({
    selectedEvent: (ctx: EventEditCtx, evt: EventEditEvt) => {
      if (evt.type !== 'DELETE_SHIFT') return ctx.selectedEvent;
      const { shift, job } = evt.data;
      const shifts = { ...ctx.selectedEvent.jobs[job.id].shifts };
      delete shifts[shift.id];
      return {
        ...ctx.selectedEvent,
        jobs: { ...ctx.selectedEvent.jobs, [job.id]: { ...job, shifts } },
      };
    },
  }),
  validateEvent: assign({
    error: (ctx: EventEditCtx): string | null => {
      const { selectedEvent } = ctx;
      const { name, date, jobs } = selectedEvent;
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
  draftEvent: assign({
    selectedEvent: (ctx: EventEditCtx) => {
      const { selectedEvent } = ctx;
      return { ...selectedEvent, status: 'draft' };
    },
  }),
  previewEvent: assign({
    selectedEvent: (ctx: EventEditCtx) => {
      const { selectedEvent } = ctx;
      return { ...selectedEvent, status: 'preview' };
    },
  }),
  publishEvent: assign({
    selectedEvent: (ctx: EventEditCtx) => {
      const { selectedEvent } = ctx;
      return { ...selectedEvent, status: 'open' };
    },
  }),

  lockEvent: assign({
    selectedEvent: (ctx: EventEditCtx) => {
      const { selectedEvent } = ctx;
      return { ...selectedEvent, status: 'lock' };
    },
  }),
  archiveEvent: assign({
    selectedEvent: (ctx: EventEditCtx) => {
      const { selectedEvent } = ctx;
      return { ...selectedEvent, status: 'archive' };
    },
  }),
};
