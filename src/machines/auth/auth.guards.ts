import type { AuthCtx } from './auth.machine';

export const guards = {
  completeRequired: (ctx: AuthCtx) => {
    return !!(
      ctx.user?.email?.length &&
      ctx.user?.phoneNumber?.length &&
      ctx.user?.displayName?.length
    );
  },
};
