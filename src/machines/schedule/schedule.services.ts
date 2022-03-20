import { db } from '$config/firebase';
import { Job, ShiftSignUp, VEvent } from '$models';
import {
  query,
  collectionGroup,
  where,
  Query,
  collection,
  documentId,
  Firestore,
} from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { firstValueFrom, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import type { ScheduleCtx } from './schedule.machine';

export const services = initServices(db);

function initServices(db: Firestore) {
  return {
    scheduleLoader,
  };
}

function scheduleLoader(ctx: ScheduleCtx): Promise<VEvent[]> {
  return firstValueFrom(
    collectionData(signUpsQuery(db, ctx.user.uid), { idField: 'id' }).pipe(
      switchMap((signUps) => signUpsToSchedule(signUps))
    )
  );
}

function signUpsQuery(db: Firestore, uid: string): Query<ShiftSignUp> {
  return query(
    collectionGroup(db, 'signUps'),
    where('volunteerUid', '==', uid)
  ).withConverter(ShiftSignUp.firebaseConverter());
}

function eventsQuery(db: Firestore, eventIds: string[]): Query<VEvent> {
  return query(
    collection(db, 'events'),
    where(documentId(), 'in', eventIds)
  ).withConverter(VEvent.firebaseConverter());
}

function signUpsToSchedule(signUps: ShiftSignUp[]): Observable<VEvent[]> {
  return collectionData(
    eventsQuery(
      db,
      signUps.map((s) => s.eventId)
    ),
    {
      idField: 'id',
    }
  ).pipe(map((events: VEvent[]) => buildSchedule(events, signUps)));
}

/**
 * Returns a list of events that the user has signed up for with only the jobs
 * and shifts that they signed up for.
 */
function buildSchedule(events: VEvent[], signUps: ShiftSignUp[]): VEvent[] {
  return events.map((event) =>
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
