import { useMachine } from '$machines/useMachine';
import { machine } from './eventShow.machine';

export function useShowEvent() {
  return useMachine(machine, {});
}
