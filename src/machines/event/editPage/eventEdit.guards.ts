import type { EventEditCtx } from './eventEdit.machine';

export const guards = {
  isLoaded: (ctx: EventEditCtx) => ctx.loaded,
};
