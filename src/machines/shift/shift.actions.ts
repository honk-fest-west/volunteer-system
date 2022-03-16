import { createEventsObservable } from '$machines/events.observable';
import { createSelectedEventObservable } from '$machines/selectedEvent.observable';
import { push } from 'svelte-spa-router';
import { assign, spawn } from 'xstate';
import type { ShiftCtx, ShiftEvt } from './shift.machine';

export const actions = {
  spawnEventsObservable: assign({
    eventsRef: () => spawn(createEventsObservable(['open'])),
  }),
  spawnSelectedEventObservable: assign({
    selectedEventRef: (ctx: ShiftCtx) =>
      spawn(createSelectedEventObservable(ctx.selectedEventId)),
  }),
  setSelectedEventId: assign({
    selectedEventId: (ctx: ShiftCtx, evt: ShiftEvt) => {
      if (evt.type !== 'SHOW.AT') return ctx.selectedEventId;
      return evt.data;
    },
  }),
  setSelectedEvent: assign({
    selectedEvent: (ctx: ShiftCtx, evt: ShiftEvt) => {
      if (evt.type !== 'SELECTED_EVENT.UPDATE') return ctx.selectedEvent;
      return evt.data;
    },
  }),
  setEvents: assign({
    events: (ctx: ShiftCtx, evt: ShiftEvt) => {
      if (evt.type !== 'EVENTS.UPDATE') return ctx.events;
      return evt.data;
    },
  }),
  gotoShow: (ctx: ShiftCtx, evt: ShiftEvt) => {
    if (evt.type !== 'INDEX.GOTO_SHOW') return;
    const { id } = evt.data;
    push(`/system/shifts/${id}`);
  },
  gotoIndex: () => {
    push('/system/shifts');
  },
};
