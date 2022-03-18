import type { User } from '$types';
import { Timestamp, type FirestoreDataConverter } from '@firebase/firestore';

export class ShiftSignUp {
  eventId: string;
  jobId: string;
  shiftId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  volunteerUid: string;
  volunteerDisplayName: string | null;
  volunteerPhotoURL: string | null;
  comment: string | null;

  constructor(public id: string) {
    this.eventId = null;
    this.jobId = null;
    this.shiftId = null;
    this.createdAt = null;
    this.updatedAt = null;
    this.volunteerUid = null;
    this.volunteerDisplayName = null;
    this.volunteerPhotoURL = null;
    this.comment = null;
  }

  public static firebaseConverter(): FirestoreDataConverter<ShiftSignUp> {
    return {
      toFirestore: (model: ShiftSignUp) => {
        const { id, ...rest } = model;
        return rest;
      },
      fromFirestore: (snapshot, options) => {
        const rest = snapshot.data(options);
        return new ShiftSignUp(snapshot.id).update(rest);
      },
    };
  }

  public static create(
    id: string,
    user: User,
    data: Partial<ShiftSignUp>
  ): ShiftSignUp {
    const signUpData = {
      volunteerUid: user.uid,
      volunteerDisplayName: user.displayName,
      volunteerPhotoURL: user.photoURL,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      ...data,
    };
    return new ShiftSignUp(id).update(signUpData);
  }

  public static from(data: Partial<ShiftSignUp>): ShiftSignUp {
    const event = new ShiftSignUp(data.id);
    Object.assign(event, data);
    return event;
  }

  public update(data: Partial<ShiftSignUp>): ShiftSignUp {
    delete data.id;
    Object.assign(this, data);
    return this;
  }
}
