import type { EventCtx } from '../event.machine';
import { assign, send, spawn } from 'xstate';
import { stop } from 'xstate/lib/actions';
import { autoSaveMachine } from '../autoSave.machine';
import {
  createEventsLoader,
  createSelectedEventLoader,
  createSignUpsLoader,
} from '../event.loaders';

export const spawnActions = {
  // AUTOSAVE
  spawnAutoSave: assign({
    autoSaveRef: ({ selectedEvent }: EventCtx) => {
      return spawn(autoSaveMachine.withContext({ selectedEvent }));
    },
  }),
  stopAutoSave: stop(({ autoSaveRef }: EventCtx) => autoSaveRef),
  saveEvent: send(
    ({ selectedEvent }: EventCtx) => ({
      type: 'EVENT_CHANGED',
      selectedEvent,
    }),
    { to: (ctx: EventCtx) => ctx.autoSaveRef }
  ),

  // EVENTS
  spawnEventsLoader: assign({
    eventsLoaderRef: () =>
      spawn(createEventsLoader(['draft', 'preview', 'open', 'lock'])),
  }),
  stopEventsLoader: stop(({ eventsLoaderRef }: EventCtx) => eventsLoaderRef),

  // SELECTED EVENT
  spawnSelectedEventLoader: assign({
    selectedEventLoaderRef: ({ selectedEventId }: EventCtx) =>
      spawn(createSelectedEventLoader(selectedEventId)),
  }),
  stopSelectedEventLoader: stop(
    ({ selectedEventLoaderRef }: EventCtx) => selectedEventLoaderRef
  ),

  // SIGN UPS
  spawnSignUpsLoader: assign({
    signUpsLoaderRef: (ctx: EventCtx) =>
      spawn(createSignUpsLoader(ctx.selectedEventId)),
  }),
  stopSignUpsLoader: stop(({ signUpsLoaderRef }: EventCtx) => signUpsLoaderRef),
};
