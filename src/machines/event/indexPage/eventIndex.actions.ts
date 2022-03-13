import type { QuerySnapshot, DocumentData } from 'firebase/firestore';
import { push } from 'svelte-spa-router';
import { assign } from 'xstate';
import type { EventIndexCtx, EventIndexEvt } from './eventIndex.machine';

export const actions = {
  setEvents: assign({
    events: (ctx: EventIndexCtx, evt: EventIndexEvt) => {
      if (evt.type !== 'done.invoke.eventsLoader') return ctx.events;
      const { docs } = evt.data as QuerySnapshot<DocumentData>;
      return docs.reduce((acc, doc) => {
        acc[doc.id] = { ...doc.data(), id: doc.id };
        return acc;
      }, {});
    },
    loaded: true,
  }),
  setError: assign({
    error: (_, evt: EventIndexEvt) => console.log({ setError: evt }),
  }),
  addEvent: assign({
    events: (ctx: EventIndexCtx, evt: EventIndexEvt) => {
      if (evt.type !== 'done.invoke.eventAdder') return ctx.events;
      const event = evt.data;
      return { ...ctx.events, [event.id]: { ...event } };
    },
  }),
  gotoEvent: (_, evt: EventIndexEvt) => {
    if (evt.type !== 'SELECT_EVENT' && evt.type !== 'done.invoke.eventAdder')
      return;

    const event = evt.data;
    if (event.status === 'draft') {
      push(`/system/events/${event.id}/edit`);
    } else {
      push(`/system/events/${event.id}`);
    }
  },
};
