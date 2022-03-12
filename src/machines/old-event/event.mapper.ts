import type { VEvent } from '$types';
import { Timestamp } from 'firebase/firestore';

export const eventMapper = ({
  id,
  status,
  name,
  date,
  description,
  locationUrl,
  jobs,
  createdAt,
}: Partial<VEvent>): VEvent => {
  return {
    id: id || null,
    status: status || 'draft',
    name: name || null,
    date: date || null,
    description: description || null,
    locationUrl: locationUrl || null,
    jobs: jobs || {},
    createdAt: createdAt || Timestamp.now(),
  };
};
