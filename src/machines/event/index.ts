import { useMachine } from '$machines/useMachine';
import { eventMachine } from './event.machine';

const events = useMachine(eventMachine, {});

export function useEvents() {
  return events;
}
