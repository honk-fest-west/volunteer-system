import {
  type DocumentData,
  type QuerySnapshot,
  Timestamp,
} from 'firebase/firestore';
import { push } from 'svelte-spa-router';
import { assign, send, spawn } from 'xstate';
import { v4 as uuidv4 } from 'uuid';
import type { EventCtx, EventEvt } from './event.machine';
import { autoSaveMachine } from './autoSave.machine';
import type { Job, Shift } from '$types';

export const actions = {
  gotoEvent: (_, evt: EventEvt) => {
    if (evt.type !== 'SELECT_EVENT' && evt.type !== 'done.invoke.eventAdder')
      return;

    const event = evt.data;
    if (event.status === 'draft') {
      push(`/system/events/${event.id}/edit`);
    } else {
      push(`/system/events/${event.id}`);
    }
  },
  gotoIndex: () => push('/system/events'),
  setEvents: assign({
    events: (ctx: EventCtx, evt: EventEvt) => {
      if (evt.type !== 'done.invoke.eventsLoader') return ctx.events;
      const { docs } = evt.data as QuerySnapshot<DocumentData>;
      return docs.reduce((acc, doc) => {
        acc[doc.id] = { ...doc.data(), id: doc.id };
        return acc;
      }, {});
    },
    loaded: true,
  }),
  setSelectedEventId: assign({
    selectedEventId: (ctx: EventCtx, evt: EventEvt) => {
      if (evt.type !== 'AT_EDIT') return ctx.selectedEventId;
      return evt.data.eventId;
    },
  }),
  setSelectedEvent: assign({
    selectedEvent: (ctx: EventCtx, evt: EventEvt) => {
      if (evt.type !== 'done.invoke.selectedEventLoader')
        return ctx.selectedEvent;
      const { data } = evt;
      return data;
    },
    loaded: true,
  }),
  setError: assign({
    error: (_, evt: EventEvt) => console.log({ setError: evt }),
  }),
  addEvent: assign({
    events: (ctx: EventCtx, evt: EventEvt) => {
      if (evt.type !== 'done.invoke.eventAdder') return ctx.events;
      const event = evt.data;
      return { ...ctx.events, [event.id]: { ...event } };
    },
  }),
  initAutoSave: assign({
    autoSaveRef: ({ selectedEvent }: EventCtx) => {
      return spawn(autoSaveMachine.withContext({ selectedEvent }));
    },
  }),
  clearError: assign({
    error: () => null,
  }),
  updateEvent: send(
    ({ selectedEvent }: EventCtx) => ({
      type: 'EVENT_CHANGED',
      selectedEvent,
    }),
    { to: (ctx: EventCtx) => ctx.autoSaveRef }
  ),
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
  deleteJob: assign({
    selectedEvent: (ctx: EventCtx, evt: EventEvt) => {
      if (evt.type !== 'DELETE_JOB') return ctx.selectedEvent;
      const { id } = evt.data.job;
      const jobs = { ...ctx.selectedEvent.jobs };
      delete jobs[id];
      return { ...ctx.selectedEvent, jobs };
    },
  }),
  addShift: assign({
    selectedEvent: (ctx: EventCtx, evt: EventEvt) => {
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
    selectedEvent: (ctx: EventCtx, evt: EventEvt) => {
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
