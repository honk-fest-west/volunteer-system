import type { EventCtx } from './event.machine';

export const guards = {
	// Event has name
	// Event has date
	// Event has at least one job
	// Each job has name
	// Each job has at least one shift
	// Each shift has from and to
	eventIsInvalid: (ctx: EventCtx) => {
		return !!ctx.error?.length;
	}
};
