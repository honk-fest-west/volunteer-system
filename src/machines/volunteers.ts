import { browser } from '$app/env';

import { Timestamp, collection, getDocs } from 'firebase/firestore';
import { writable } from 'svelte/store';
import { db } from '$config/firebase';

export interface Volunteer {
  uid: string;
  displayName: string;
  email: string;
  phone?: string;
  photoURL?: string;
  createdAt: Timestamp
}

const createVolunteers = (db) => {
  const { subscribe, set } = writable<Array<Volunteer>>([]);

  async function listen() {
    const volunteers = collection(db, 'users');
    const snapshot = await getDocs(volunteers);
    const data: Volunteer[] = snapshot.docs.map((doc) =>
      doc.data()
    ) as Volunteer[];
    set(data);
  }

  if (browser) {
    listen();
  }

  return {
    subscribe,
  };
};

export const volunteers = createVolunteers(db);
