import type { EventShowCtx } from './eventShow.machine';

export const guards = {
  eventIsArchived: (ctx: EventShowCtx) =>
    ctx.selectedEvent?.status === 'archived',
  eventIsLockedOrArchived: (ctx: EventShowCtx) =>
    ctx.selectedEvent?.status === 'locked' ||
    ctx.selectedEvent?.status === 'archived',
};
