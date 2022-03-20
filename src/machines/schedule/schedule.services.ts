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
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import type { ScheduleCtx } from './schedule.machine';

export const services = {
  scheduleLoader,
};

function scheduleLoader(ctx: ScheduleCtx): Promise<VEvent[]> {
  return firstValueFrom(
    collectionData(eventsQuery(), { idField: 'id' }).pipe(
      tap((events) => console.log('events', events)),
      switchMap((events) => eventsToSchedule(events, ctx.user.uid))
    )
  );
}

function eventsQuery(): Query<VEvent> {
  return query(
    collection(db, 'events'),
    where('status', '!=', 'archived')
  ).withConverter(VEvent.firebaseConverter());
}

function eventsToSchedule(events: VEvent[], uid: string): Observable<VEvent[]> {
  console.log('eventsToSchedule', events, uid);
  return collectionData(
    signUpsQuery(
      uid,
      events.map((e) => e.id)
    ),
    { idField: 'id' }
  ).pipe(
    tap((signUps) => console.log('signUps', signUps)),
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
