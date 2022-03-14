import { db } from '$config/firebase';
import { sharedServices } from '../shared.services';

function initServices(db) {
  return {
    ...sharedServices,
  };
}

export const services = initServices(db);
