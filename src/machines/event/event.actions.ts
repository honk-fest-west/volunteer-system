import type { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { replace } from 'svelte-spa-router';
import { assign, send, spawn } from 'xstate';
import type { EventCtx, EventEvt } from './event.machine';
import { autoSaveMachine } from './autoSave.machine';

export const actions = {
  gotoEvent: (_, evt: EventEvt) => {
    if (evt.type !== 'SELECT_EVENT' && evt.type !== 'done.invoke.eventAdder')
      return;

    const event = evt.data;
    if (event.status === 'draft') {
      replace(`/system/events/${event.id}/edit`);
    } else {
      replace(`/system/events/${event.id}`);
    }
  },
  gotoIndex: () => replace('/system/events'),
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
      return evt.eventId;
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
};
