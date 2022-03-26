import { db } from '$config/firebase';
import { Job, ShiftSignUp, VEvent } from '$models';
import {
  query,
  collectionGroup,
  where,
  Query,
  collection,
} from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import type { Observable } from 'rxjs';
import { map, switchMap, tap, catchError } from 'rxjs/operators';

export function createScheduleLoader(uid: string) {
  console.log('UID', uid);
  return collectionData(eventsQuery(), { idField: 'id' }).pipe(
    switchMap((events) => eventsToSchedule(events, uid)),
    map((schedule) => ({ type: 'LOAD.SCHEDULE', data: schedule })),
    catchError((err) => {
      console.log('Error loading schedule', err);
      return [{ type: 'LOAD.ERROR', data: err }];
    })
  );
}

function eventsQuery(): Query<VEvent> {
  return query(
    collection(db, 'events'),
    where('status', '!=', 'archive')
  ).withConverter(VEvent.firebaseConverter());
}

function eventsToSchedule(events: VEvent[], uid: string): Observable<VEvent[]> {
  return collectionData(
    signUpsQuery(
      uid,
      events.map((e) => e.id)
    ),
    { idField: 'id' }
  ).pipe(
    catchError((err) => {
      console.log('Error loading schedule signUps', err);
      return [];
    }),
    map((signUps) => buildSchedule(events, signUps))
  );
}

function signUpsQuery(uid: string, eventIds: string[]): Query<ShiftSignUp> {
  return query(
    collectionGroup(db, 'signUps'),
    where('eventId', 'in', eventIds),
    where('volunteerUid', '==', uid)
  ).withConverter(ShiftSignUp.firebaseConverter());
}

/**
 * Returns a list of events the user signed up for with only the jobs
 * and shifts that they signed up for.
 */
function buildSchedule(events: VEvent[], signUps: ShiftSignUp[]): VEvent[] {
  const signedUpEventIds = signUps.map((s) => s.eventId);
  return events
    .filter((e) => signedUpEventIds.includes(e.id))
    .map((event) =>
      signUps
        .filter((s) => s.eventId === event.id)
        .reduce((acc, signUp) => {
          if (!acc.jobs[signUp.jobId]) {
            acc.jobs[signUp.jobId] = Job.from({
              ...event.jobs[signUp.jobId],
              shifts: {},
            });
          }
          acc.jobs[signUp.jobId].shifts[signUp.shiftId] = {
            ...event.jobs[signUp.jobId].shifts[signUp.shiftId],
          };
          return acc;
        }, VEvent.from({ ...event, jobs: {} }))
    );
}
