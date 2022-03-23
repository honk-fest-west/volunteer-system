import type { EventCtx } from './event.machine';
import { Job } from '$models';

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
  allowPrevSchedulePage: (ctx: EventCtx) => ctx.schedulePage > 0,
  allowNextSchedulePage: (ctx: EventCtx) =>
    (ctx.schedulePage + 1) * Job.PER_SCHEDULE_PAGE <
    Object.values(ctx.selectedEvent.jobs).length,
};
