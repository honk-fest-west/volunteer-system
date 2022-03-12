import { createMachine, type MachineConfig } from 'xstate';
import type { EventCollection, VEvent } from '$types';
import type { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { indexPage } from './eventIndex.machine';
import { services } from './event.services';
import { guards } from './event.guards';
import { actions } from './event.actions';

export interface EventCtx {
  events: EventCollection;
  loaded: boolean;
  selectedEventId: string | null;
  error: string | null;
}

export type EventEvt =
  | { type: 'AT_INDEX' }
  | { type: 'AT_EDIT'; eventId: string }
  | { type: 'SELECT_EVENT'; data: VEvent }
  | { type: 'ADD_EVENT' }
  | { type: 'done.invoke.eventsLoader'; data: QuerySnapshot<DocumentData> }
  | { type: 'done.invoke.eventAdder'; data: VEvent };

export type EventState =
  | { value: 'pages'; context: EventCtx }
  | { value: 'indexPage'; context: EventCtx }
  | { value: 'indexPage.idle'; context: EventCtx }
  | { value: 'indexPage.loadingEvent'; context: EventCtx }
  | { value: 'indexPage.addingEvent'; context: EventCtx }
  | { value: 'editPage'; context: EventCtx };

const config: MachineConfig<EventCtx, any, EventEvt> = {
  id: 'event',
  context: {
    loaded: false,
    events: {},
    selectedEventId: null,
    error: null,
  },
  schema: {
    context: {} as EventCtx,
    events: {} as EventEvt,
    services: {} as {
      eventsLoader: {
        data: QuerySnapshot<DocumentData>;
      };
    },
  },
  initial: 'pages',
  states: {
    pages: {
      on: {
        AT_INDEX: {
          target: 'indexPage',
        },
      },
    },
    indexPage: { ...indexPage },
  },
};

export const eventMachine = createMachine<EventCtx, EventEvt, EventState>(
  config,
  {
    actions,
    services,
    guards,
  }
);
