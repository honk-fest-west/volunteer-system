import type { EventCtx } from './event.machine';

export const guards = {
  isLoaded: (ctx: EventCtx) => ctx.loaded,
};
