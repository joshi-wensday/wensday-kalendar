import { User as FirebaseUser } from 'firebase/auth';

export type User = FirebaseUser;

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  createdAt: Date;
}