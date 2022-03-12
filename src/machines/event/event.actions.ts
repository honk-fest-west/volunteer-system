import type { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { replace } from 'svelte-spa-router';
import { assign } from 'xstate';
import type { EventCtx, EventEvt } from './event.machine';

export const actions = {
  gotoEvent: (_, evt: EventEvt) => {
    console.log('gotoEvent', evt);
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
  addEvent: assign({
    events: (ctx: EventCtx, evt: EventEvt) => {
      if (evt.type !== 'done.invoke.eventAdder') return ctx.events;
      const event = evt.data;
      return { ...ctx.events, [event.id]: { ...event } };
    },
  }),
  setError: assign({
    error: (_, evt: EventEvt) => console.log({ setError: evt }),
  }),
};
