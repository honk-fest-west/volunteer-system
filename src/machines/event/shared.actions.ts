import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  Query,
  query,
  setDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import type { EventIndexEvt } from './indexPage/eventIndex.machine';
import type { EventEditEvt } from './editPage/eventEdit.machine';
import type { VEvent } from '$types';
import { db } from '$config/firebase';
import { push } from 'svelte-spa-router';

export const sharedActions = {
  gotoEvent: (_, evt: EventIndexEvt | EventEditEvt) => {
    if (
      evt.type !== 'SELECT_EVENT' &&
      evt.type !== 'done.invoke.eventAdder' &&
      evt.type !== 'done.invoke.eventDuplicator'
    )
      return;

    const event = evt.data;
    if (event.status === 'draft') {
      push(`/system/events/${event.id}/edit`);
    } else {
      push(`/system/events/${event.id}`);
    }
  },
};
