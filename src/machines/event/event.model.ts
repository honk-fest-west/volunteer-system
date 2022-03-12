import type { VEvent } from '$types';
import { Timestamp } from 'firebase/firestore';

export const initializeEvent = (): VEvent => {
  return {
    id: null,
    status: 'draft',
    name: null,
    date: null,
    description: null,
    locationUrl: null,
    jobs: {},
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };
};
