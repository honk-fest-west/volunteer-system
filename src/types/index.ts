import type { User as AuthUser } from 'firebase/auth';
import type { Timestamp } from 'firebase/firestore';

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

export interface VEvent {
  id: string | null;
  status: 'draft' | 'open' | 'locked' | 'archived';
  name: string | null;
  description: string | null;
  date: string | null;
  locationUrl: string | null;
  jobs: Jobs;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Job {
  id: string;
  createdAt: Timestamp;
  name: string | null;
  description: string | null;
  shifts: Shifts;
}

export interface Shift {
  id: string;
  createdAt: Timestamp;
  from: string | null;
  to: string | null;
  slots: number;
}

export interface VolunteerShift {
  id: string;
  eventId: string;
  jobId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  volunteerUids: string[];
}

export type VolunteerJobShiftsCollection = {
  [key: string]: {
    signUpCount: number;
    shifts: VolunteerShift[];
  };
};

export type Shifts = { [id: string]: Shift };
export type Jobs = { [id: string]: Job };
