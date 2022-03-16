import { assign } from 'xstate';
import { sharedActions } from '../shared.actions';
import type { EventIndexCtx, EventIndexEvt } from './eventIndex.machine';

export const actions = {
  ...sharedActions,
  setEvents: assign({
    events: (ctx: EventIndexCtx, evt: EventIndexEvt) => {
      if (evt.type !== 'done.invoke.eventsLoader') return ctx.events;
      const { docs } = evt.data;

      return docs.reduce((acc, doc) => {
        const event = doc.data();
        acc[event.id] = event;
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
      return { ...ctx.events, [event.id]: event };
    },
  }),
};
