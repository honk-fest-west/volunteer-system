import { db } from '$config/firebase';
import { ShiftSignUp, VEvent } from '$models';
import {
  collection,
  deleteDoc,
  doc,
  runTransaction,
  setDoc,
} from 'firebase/firestore';
import type { ShiftCtx, ShiftEvt } from './shift.machine';

function initServices(db) {
  return {
    signUpAdder: (ctx: ShiftCtx, evt: ShiftEvt) => {
      if (evt.type !== 'SHOW.SIGN_UP') return;
      const signUpsRef = doc(
        collection(db, 'events', evt.data.eventId, 'signUps')
      ).withConverter(ShiftSignUp.firebaseConverter());
      const signUp = ShiftSignUp.create(signUpsRef.id, ctx.user, evt.data);
      const eventRef = doc(db, 'events', ctx.selectedEvent.id);

      return runTransaction(db, (transaction) => {
        return transaction.get(eventRef).then((eventDoc) => {
          const event = eventDoc.data();
          const newCount = VEvent.from(event).signedUp(evt.data) + 1;
          return transaction
            .update(eventRef, VEvent.signedUpPath(evt.data), newCount)
            .set(signUpsRef, signUp);
        });
      });
    },
    signUpRemover: (ctx: ShiftCtx, evt: ShiftEvt) => {
      if (evt.type !== 'SHOW.UNSIGN_UP') return;
      const { signUpId, eventId } = evt.data;
      const signUpsRef = doc(db, 'events', eventId, 'signUps', signUpId);
      const eventRef = doc(db, 'events', ctx.selectedEvent.id);

      return runTransaction(db, (transaction) => {
        return transaction.get(eventRef).then((eventDoc) => {
          const event = eventDoc.data();
          const newCount = VEvent.from(event).signedUp(evt.data) - 1;
          return transaction.update(
            eventRef,
            VEvent.signedUpPath(evt.data),
            newCount
          );
        });
      }).then(() => deleteDoc(signUpsRef));
    },
  };
}

export const services = initServices(db);
