import { createEventsObservable } from '$machines/events.observable';
import { assign, spawn } from 'xstate';
import type { ShiftCtx, ShiftEvt } from './shift.machine';

export const actions = {
  spawnEventsObservable: assign({
    eventsRef: () => spawn(createEventsObservable(['open'])),
  }),
  setSelectedEventId: assign({
    selectedEventId: (ctx: ShiftCtx, evt: ShiftEvt) => {
      if (evt.type !== 'SELECT_EVENT') return ctx.selectedEventId;
      return evt.data;
    },
  }),
  setEvents: assign({
    events: (ctx: ShiftCtx, evt: ShiftEvt) => {
      console.log('setEvents', evt);
      if (evt.type !== 'EVENTS.UPDATE') return ctx.events;
      const { data } = evt;
      return data;
    },
  }),
};
