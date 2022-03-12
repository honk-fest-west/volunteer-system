import {
  Timestamp,
  type DocumentData,
  type QuerySnapshot,
} from 'firebase/firestore';
import { assign, spawn, actions as xstateActions } from 'xstate';
import { v4 as uuidv4 } from 'uuid';
import type { EventCtx, EventEvt } from './event.machine';
import { eventMapper } from './event.mapper';
import { autoSaveMachine } from './autoSave.machine';
import type { VEvent, Shift, Job } from '$types';
import { push } from 'svelte-spa-router';
const { send } = xstateActions;

export const actions = {
  initAutoSave: assign({
    autoSaveRef: ({ selectedEvent }: EventCtx) => {
      return spawn(autoSaveMachine.withContext({ selectedEvent }));
    },
  }),
  setEvents: assign({
    events: (_, evt: EventEvt) => {
      const { docs } = evt.data as QuerySnapshot<DocumentData>;
      return docs.map((doc) => eventMapper({ id: doc.id, ...doc.data() }));
    },
  }),
  setJobs: assign({
    selectedEvent: (ctx: EventCtx, evt: EventEvt) => {
      const { docs } = evt.data as QuerySnapshot<DocumentData>;
      const jobs = docs.reduce(
        (acc, doc) => ({ ...acc, [doc.id]: { id: doc.id, ...doc.data() } }),
        {}
      );
      return { ...ctx.selectedEvent, jobs };
    },
  }),
  deleteJob: assign({
    selectedEvent: (ctx: EventCtx, evt: EventEvt) => {
      const { id } = evt.data as Job;
      const jobs = { ...ctx.selectedEvent.jobs };
      delete jobs[id];
      return { ...ctx.selectedEvent, jobs };
    },
  }),
  deleteShift: assign({
    selectedEvent: (ctx: EventCtx, evt: EventEvt) => {
      const { shift, job } = evt.data as { shift: Shift; job: Job };
      const shifts = { ...ctx.selectedEvent.jobs[job.id].shifts };
      delete shifts[shift.id];
      return {
        ...ctx.selectedEvent,
        jobs: { ...ctx.selectedEvent.jobs, [job.id]: { ...job, shifts } },
      };
    },
  }),
  selectEvent: assign({
    selectedEvent: (_, evt: EventEvt) => evt.data,
  }),
  updateEvent: send(
    ({ selectedEvent }: EventCtx) => ({
      type: 'EVENT_CHANGED',
      selectedEvent,
    }),
    { to: (ctx: EventCtx) => ctx.autoSaveRef }
  ),
  updateEvents: assign({
    events: (ctx: EventCtx) => {
      const { events } = ctx;
      const { selectedEvent } = ctx;
      const index = events.findIndex((evt) => evt.id === selectedEvent.id);
      const newEvents = [...events];
      newEvents[index] = selectedEvent;
      return newEvents;
    },
  }),
  clearError: assign({
    error: () => null,
  }),
  setError: assign({
    error: (_, evt: EventEvt) => {
      const data = evt.data as { code: string; message: string };
      return data?.code;
    },
  }),
  validateEvent: assign({
    error: (ctx: EventCtx): string | null => {
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
  addEvent: assign({
    selectedEvent: (_, evt: EventEvt) => {
      return evt.data;
    },
    events: (ctx: EventCtx, evt: EventEvt) => {
      const event = evt.data as VEvent;
      return [...ctx.events, event];
    },
  }),
  // 1. creates a new job
  // 2. adds the job to the selected event
  addJob: assign({
    selectedEvent: (ctx: EventCtx) => {
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
  addShift: assign({
    selectedEvent: (ctx: EventCtx, evt: EventEvt) => {
      const id = uuidv4();
      const { selectedEvent } = ctx;
      const job = evt.data as Job;
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
  openEvent: assign({
    selectedEvent: (ctx: EventCtx) => {
      const { selectedEvent } = ctx;
      return { ...selectedEvent, status: 'open' };
    },
  }),
};
