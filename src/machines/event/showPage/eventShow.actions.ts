import type { VolunteerShift } from '$types';
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
  setVolunteerJobShifts: assign({
    volunteerJobShifts: (ctx: EventShowCtx, evt: EventShowEvt) => {
      if (evt.type !== 'done.invoke.volunteerShiftsLoader')
        return ctx.volunteerJobShifts;
      const { docs } = evt.data;
      return docs.reduce((acc, doc) => {
        const shift = doc.data() as VolunteerShift;
        const jobShifts = acc[shift.jobId] || { signUpCount: 0, shifts: [] };
        jobShifts.shifts = [...jobShifts.shifts, shift];
        jobShifts.signUpCount =
          jobShifts.signUpCount + shift.volunteerUids.length;
        acc[shift.jobId] = jobShifts;
        return acc;
      }, {});
    },
  }),
  setError: assign({
    error: (_, evt: EventShowEvt) => console.log({ setError: evt }),
  }),
};
