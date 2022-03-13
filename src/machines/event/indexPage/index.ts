import { useMachine } from '$machines/useMachine';
import { machine } from './eventIndex.machine';

export function useEventIndex() {
  return useMachine(machine, {});
}
