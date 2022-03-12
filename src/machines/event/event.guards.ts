import type { EventCtx } from './event.machine';

export const guards = {
  eventsLoaded: (ctx: EventCtx) => ctx.loaded,
};
