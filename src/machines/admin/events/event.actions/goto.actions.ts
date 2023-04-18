import type { EventEvt } from '../event.machine';
import { push } from 'svelte-spa-router';
import { prefix } from '$routes/prefix';

export const gotoActions = {
  gotoIndex: () => push(prefix.admin_events_path()),

  gotoEvent: (_, evt: EventEvt) => {
    if (
      evt.type !== 'EVENT.SELECT' &&
      evt.type !== 'done.invoke.eventAdder' &&
      evt.type !== 'done.invoke.eventDuplicator'
    )
      return;
    push(prefix.admin_events_path(evt.data));
  },
};
