import { useMachine } from '$machines/useMachine';
import { machine } from './shift.machine';

export function useShiftMachine() {
  return useMachine(machine, {});
}
