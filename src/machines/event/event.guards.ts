import type { EventCtx } from './event.machine';

export const guards = {
  eventStatusIsDraft: (ctx: EventCtx) => ctx.selectedEvent.status === 'draft',
  eventStatusIsPreview: (ctx: EventCtx) =>
    ctx.selectedEvent.status === 'preview',
  eventStatusIsOpen: (ctx: EventCtx) => ctx.selectedEvent.status === 'open',
  eventStatusIsLock: (ctx: EventCtx) => ctx.selectedEvent.status === 'lock',
  eventStatusIsArchive: (ctx: EventCtx) =>
    ctx.selectedEvent.status === 'archive',
  eventIsInvalid: (ctx: EventCtx) => !!ctx.error,
  eventIsValid: (ctx: EventCtx) => !ctx.error,
};
