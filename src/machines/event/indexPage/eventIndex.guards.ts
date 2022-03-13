import type { EventIndexCtx } from './eventIndex.machine';

export const guards = {
  isLoaded: (ctx: EventIndexCtx) => ctx.loaded,
};
