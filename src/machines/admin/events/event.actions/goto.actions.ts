import type { EventEvt } from '../event.machine';
import { push } from 'svelte-spa-router';

export const gotoActions = {
  gotoIndex: () => push('/system/events'),

  gotoEvent: (_, evt: EventEvt) => {
    if (
      evt.type !== 'EVENT.SELECT' &&
      evt.type !== 'done.invoke.eventAdder' &&
      evt.type !== 'done.invoke.eventDuplicator'
    )
      return;
    push(`/system/events/${evt.data}`);
  },
};
