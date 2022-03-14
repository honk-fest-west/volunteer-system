import { assign } from 'xstate';
import type { EventShowCtx, EventShowEvt } from './eventShow.machine';

export const actions = {
  setSelectedEventId: assign({
    selectedEventId: (ctx: EventShowCtx, evt: EventShowEvt) => {
      if (evt.type !== 'SHOW_EVENT') return ctx.selectedEventId;
      return evt.data.eventId;
    },
  }),
  setSelectedEvent: assign({
    selectedEvent: (ctx: EventShowCtx, evt: EventShowEvt) => {
      if (
        evt.type !== 'done.invoke.selectedEventLoader' &&
        evt.type !== 'done.invoke.eventDuplicator'
      )
        return ctx.selectedEvent;
      const { data } = evt;
      return data;
    },
  }),
  setError: assign({
    error: (_, evt: EventShowEvt) => console.log({ setError: evt }),
  }),
};
