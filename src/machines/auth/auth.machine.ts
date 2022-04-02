import type { Auth, User } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { createMachine } from 'xstate';
import { actions } from '$machines/auth/auth.actions';
import { guards } from '$machines/auth/auth.guards';
import { services } from '$machines/auth/auth.services';

export interface AuthCtx {
  auth: Auth | null;
  db: Firestore | null;
  user: User | null;
  error: unknown | null;
}

export type AuthEvt =
  | { type: 'LOGOUT'; data: unknown }
  | { type: 'LOGIN'; data: unknown }
  | { type: 'SIGN_UP'; data: unknown }
  | { type: 'VIEW_SIGN_IN'; data: unknown }
  | { type: 'VIEW_SIGN_UP'; data: unknown }
  | { type: 'SUBMIT_REQUIRED'; data: unknown }
  | { type: 'DELETE_ACCOUNT'; data: unknown };

type AuthState =
  | { value: 'idle'; context: AuthCtx }
  | { value: 'loadingUser'; context: AuthCtx }
  | { value: 'loadingProfile'; context: AuthCtx }
  | { value: 'signedIn'; context: AuthCtx }
  | { value: 'signedOut'; context: AuthCtx }
  | { value: { signedOut: 'signInForm' }; context: AuthCtx }
  | { value: { signedOut: 'signUpForm' }; context: AuthCtx }
  | { value: 'signingIn'; context: AuthCtx }
  | { value: 'signingOut'; context: AuthCtx }
  | { value: 'signingUp'; context: AuthCtx }
  | { value: 'requestingRequired'; context: AuthCtx }
  | { value: 'updatingProfile'; context: AuthCtx }
  | { value: 'deletingAccount'; context: AuthCtx };

const config = {
  schema: {
    context: {} as AuthCtx,
    events: {} as AuthEvt,
    services: {} as {
      authenticator: {
        data: { provider: string; email: string; password: string };
      };
    },
  },
  id: 'auth',
  // we want to start by checking if
  // user is logged in when page loads
  initial: 'authenticating',
  // context is where you keep state
  context: {
    auth: null,
    db: null,
    user: null,
    error: null,
  },

  // all possible authentication states
  states: {
    authenticating: {
      // when entering a state invoke
      // the authChecker service
      invoke: {
        id: 'authChecker',
        src: 'authChecker',
        onDone: { target: 'loadingUser', actions: 'setAuth' },
        onError: { target: 'signedOut.signInForm' },
      },
    },

    loadingUser: {
      invoke: {
        id: 'userLoader',
        src: 'userLoader',
        onDone: {
          target: 'loadingProfile',
          actions: 'setUser',
        },
        onError: {
          target: 'signedOut.signInForm',
          actions: ['setError', 'clearAuth'],
        },
      },
    },

    loadingProfile: {
      invoke: {
        id: 'profileLoader',
        src: 'profileLoader',
        onDone: {
          target: 'requestingRequired',
          actions: 'setUser',
        },
        onError: {
          target: 'signedOut.signInForm',
          actions: ['setError', 'clearAuth'],
        },
      },
    },

    requestingRequired: {
      entry: ['gotoAuthRequired', 'clearError'],
      always: [{ target: 'signedIn', cond: 'completeRequired' }],
      on: {
        SUBMIT_REQUIRED: {
          target: 'updatingProfile',
          actions: 'setUser',
        },
        LOGOUT: { target: 'signingOut' },
      },
    },

    updatingProfile: {
      invoke: {
        id: 'profileUpdater',
        src: 'profileUpdater',
        onDone: {
          target: 'signedIn',
          actions: 'setUser',
        },
        onError: {
          target: 'requestingRequired',
          actions: ['setError', 'clearAuth'],
        },
      },
    },

    signedIn: {
      entry: 'gotoSystem',
      // when receiving 'LOGOUT' event
      // transition to singingOut state
      on: {
        LOGOUT: { target: 'signingOut' },
        DELETE_ACCOUNT: { target: 'deletingAccount' },
      },
    },

    signingOut: {
      invoke: {
        id: 'logout',
        src: 'logout',
        onDone: {
          target: 'signedOut.signInForm',
          actions: ['clearAuth', 'clearError'],
        },
        onError: {
          target: 'signedOut.signInForm',
          actions: ['clearAuth', 'setError'],
        },
      },
    },

    // signedOut has two sub-states
    // we will transition to failure in
    // case of wrong password, username
    // or network error
    signedOut: {
      entry: 'gotoAuth',
      initial: 'signInForm',
      states: {
        signInForm: { type: 'final' } as { type: 'final' },
        signUpForm: { type: 'final' } as { type: 'final' },
      },
      on: {
        LOGIN: { target: 'signingIn' },
        SIGN_UP: { target: 'signingUp' },
        VIEW_SIGN_IN: { target: 'signedOut.signInForm', actions: 'clearAuth' },
        VIEW_SIGN_UP: { target: 'signedOut.signUpForm', actions: 'clearAuth' },
      },
    },

    signingIn: {
      invoke: {
        id: 'authenticator',
        src: 'authenticator',
        onDone: {
          target: 'authenticating',
          // clear error if successful login
          actions: 'clearError',
        },
        onError: {
          // transition to failure state
          // and set an error
          target: 'signedOut.signInForm',
          actions: 'setError',
        },
      },
    },

    signingUp: {
      invoke: {
        id: 'accountCreator',
        src: 'accountCreator',
        onDone: {
          target: 'authenticating',
        },
        onError: {
          target: 'signedOut.signUpForm',
          actions: 'setError',
        },
      },
    },

    deletingAccount: {
      invoke: {
        id: 'accountDeleter',
        src: 'accountDeleter',
        onDone: {
          target: 'signingOut',
        },
        onError: {
          target: 'signedIn',
          actions: 'setError',
        },
      },
    },
  },
};

export const machine = createMachine<AuthCtx, AuthEvt, AuthState>(config, {
  actions,
  services,
  guards,
});
