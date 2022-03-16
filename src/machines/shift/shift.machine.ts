import { createMachine, type MachineConfig } from 'xstate';
import type { DocumentData, QuerySnapshot } from 'firebase/firestore';
import type { EventCollection, VEvent } from '$types';
import { actions } from './shift.actions';
import { guards } from './shift.guards';
import { services } from './shift.services';

export interface EventIndexCtx {
  events: EventCollection;
  loaded: boolean;
  error: string | null;
}
