import { useMachine } from '$machines/useMachine';
import { machine } from './eventEdit.machine';

export function useEventEdit() {
  return useMachine(machine, {});
}
