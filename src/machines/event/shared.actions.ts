import type { EventIndexEvt } from './indexPage/eventIndex.machine';
import type { EventEditEvt } from './editPage/eventEdit.machine';
import { push } from 'svelte-spa-router';

export const sharedActions = {
  gotoEvent: (_, evt: EventIndexEvt | EventEditEvt) => {
    if (
      evt.type !== 'SELECT_EVENT' &&
      evt.type !== 'done.invoke.eventAdder' &&
      evt.type !== 'done.invoke.eventDuplicator'
    )
      return;

    const { id, status } = evt.data;
    if (status === 'draft') {
      push(`/system/events/${id}/edit`);
    } else {
      push(`/system/events/${id}`);
    }
  },
};
