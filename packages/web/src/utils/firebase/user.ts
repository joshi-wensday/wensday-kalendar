import { db } from './config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { User, UserProfile } from './types';

export const createUserProfile = async (user: User): Promise<void> => {
    const userRef = doc(db, 'users', user.uid);
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email || '',
      createdAt: new Date()
    };
    await setDoc(userRef, userProfile);
  };

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const userRef = doc(db, 'users', uid);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    return userDoc.data() as UserProfile;
  }
  return null;
};