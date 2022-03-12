import { useMachine } from '$machines/useMachine';
import { machine } from './auth.machine';

const auth = useMachine(machine, {});

export function useAuth() {
  return auth;
}
