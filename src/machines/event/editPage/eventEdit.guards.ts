import type { EventEditCtx } from './eventEdit.machine';

export const guards = {
  isLoaded: (ctx: EventEditCtx) => ctx.loaded,

  // Event has name
  // Event has date
  // Event has at least one job
  // Each job has name
  // Each job has at least one shift
  // Each shift has from and to
  eventIsInvalid: (ctx: EventEditCtx) => {
    return !!ctx.error?.length;
  },
};
