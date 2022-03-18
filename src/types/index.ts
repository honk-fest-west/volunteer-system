import type { User as AuthUser } from 'firebase/auth';
import type { Timestamp } from 'firebase/firestore';
import type { VEvent, Job, ShiftSignUp } from '$models';

export interface AuthState {
  user: Partial<User> | null;
  known: boolean;
}

export interface User extends AuthUser {
  uid: string;
  providerId: string;
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  phoneNumber: string | null;
  photoURL: string | null;
  status: 'inactive' | 'active' | 'pending';
  role: 'volunteer' | 'lead';
  createdAt: Timestamp | null;
  loginAt: Timestamp | null;
}

export type EventCollection = {
  [key: string]: VEvent;
};

export type EventStatus = 'draft' | 'open' | 'locked' | 'archived';
export interface Shift {
  id: string;
  createdAt: Timestamp;
  from: string | null;
  to: string | null;
  location: string | null;
  slots: number;
  signedUp: number;
  // selected: boolean; // not saved to firestore
  // conflict: boolean; // not saved to firestore
  // signUpId: string; // not saved to firestore
}

export type JobSignUpCollection = {
  [jobId: string]: { [signUpId: string]: ShiftSignUp };
};

export type Shifts = { [id: string]: Shift };
export type Jobs = { [id: string]: Job };
