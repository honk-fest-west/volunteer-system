import { Timestamp } from 'firebase/firestore';
import { push } from 'svelte-spa-router';
import { assign, send, spawn } from 'xstate';
import { v4 as uuidv4 } from 'uuid';
import type { EventEditCtx, EventEditEvt } from './eventEdit.machine';
import { autoSaveMachine } from './autoSave.machine';
import type { Job, Shift } from '$types';

export const actions = {
  gotoIndex: () => push('/system/events'),

  setSelectedEventId: assign({
    selectedEventId: (ctx: EventEditCtx, evt: EventEditEvt) => {
      if (evt.type !== 'SET_EVENT_ID') return ctx.selectedEventId;
      return evt.data.eventId;
    },
  }),
  setSelectedEvent: assign({
    selectedEvent: (ctx: EventEditCtx, evt: EventEditEvt) => {
      if (evt.type !== 'done.invoke.selectedEventLoader')
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
      const id = uuidv4();
      const { selectedEvent } = ctx;
      const createdAt = Timestamp.now();
      const job = {
        id,
        createdAt,
        name: null,
        description: null,
        shifts: {},
      } as Job;
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
        from: null,
        to: null,
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
};
