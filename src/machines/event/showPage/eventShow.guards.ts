import type { EventShowCtx } from './eventShow.machine';

export const guards = {
  isLoaded: (ctx: EventShowCtx) => !!ctx.selectedEvent,
};
