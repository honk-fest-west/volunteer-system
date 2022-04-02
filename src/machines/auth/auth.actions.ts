import { replace } from 'svelte-spa-router';
import { assign } from 'xstate';
import type { AuthCtx, AuthEvt } from './auth.machine';

export const actions = {
  // clear user info on logout
  gotoSystem: () => {
    console.log('gotoSystem');
    const cookieLocation = (document.cookie
      .split('; ')
      .find((row) => row.startsWith('_routeLocation='))
      ?.split('=') || [])[1];

    if (cookieLocation) {
      replace(cookieLocation);
    } else {
      replace('/system');
    }
  },
  gotoAuth: () => replace('/auth'),
  gotoAuthRequired: () => replace('/auth/required'),
  clearAuth: assign<AuthCtx>({ user: null, auth: null, error: null }),
  clearError: assign<AuthCtx>({ error: null }),
  // put Firebase auth object on context
  setAuth: assign({ auth: (_, evt: AuthEvt) => evt.data }),
  setDb: assign({ db: (_, evt: AuthEvt) => evt.data }),
  // put user on context in loading service
  setUser: assign({ user: (_, evt: AuthEvt) => evt.data }),
  setEmail: assign({
    user: (ctx: AuthCtx, evt: AuthEvt) => ({ ...ctx.user, email: evt.data }),
  }),
  setError: assign({
    error: (_, evt: AuthEvt) => {
      const data = evt.data as { code: string; message: string };
      return data?.code;
    },
  }),
};
