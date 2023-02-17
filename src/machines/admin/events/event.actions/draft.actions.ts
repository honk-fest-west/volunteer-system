import type { EventCtx, EventEvt } from '../event.machine';
import type { Shift } from '$types';
import { v4 as uuidv4 } from 'uuid';
import { Timestamp } from 'firebase/firestore';
import { Job } from '$models';
import { assign } from 'xstate';

export const draftActions = {
  addJob: assign({
    selectedEvent: ({ selectedEvent }: EventCtx) => {
      const job = new Job();
      const { jobs } = selectedEvent;
      return {
        ...selectedEvent,
        jobs: { ...jobs, [job.id]: { ...job } },
      };
    },
  }),

  removeJob: assign({
    selectedEvent: ({ selectedEvent }: EventCtx, evt: EventEvt) => {
      if (evt.type !== 'EVENT.REMOVE_JOB') return selectedEvent;
      const id = evt.data;
      const jobs = { ...selectedEvent.jobs };
      delete jobs[id];
      return { ...selectedEvent, jobs };
    },
  }),

  addShift: assign({
    selectedEvent: ({ selectedEvent }: EventCtx, evt: EventEvt) => {
      if (evt.type !== 'EVENT.ADD_SHIFT') return selectedEvent;
      const id = uuidv4();
      const jobId = evt.data;
      const job = selectedEvent.jobs[jobId];
      const createdAt = Timestamp.now();
      const shift = {
        id,
        createdAt,
        slots: 1,
        signedUp: 0,
        from: null,
        to: null,
        location: null,
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

  removeShift: assign({
    selectedEvent: ({ selectedEvent }: EventCtx, evt: EventEvt) => {
      if (evt.type !== 'EVENT.REMOVE_SHIFT') return selectedEvent;
      const shiftId = evt.data;
      const jobId = Object.keys(selectedEvent.jobs).find(
        (jobId) => selectedEvent.jobs[jobId].shifts[shiftId]
      );
      const job = selectedEvent.jobs[jobId];
      const shifts = { ...selectedEvent.jobs[jobId].shifts };
      delete shifts[shiftId];
      return {
        ...selectedEvent,
        jobs: { ...selectedEvent.jobs, [jobId]: { ...job, shifts } },
      };
    },
  }),

  validateEvent: assign({
    error: ({ selectedEvent: { name, date, location, jobs } }: EventCtx) => {
      if (!name?.length) {
        return 'Event Name is Required' as string;
      }
      if (!date) {
        return 'Event Date is Required' as string;
      }
      if (!location?.length) {
        return 'Event Location is Required' as string;
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
};
