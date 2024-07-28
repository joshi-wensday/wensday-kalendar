// packages/web/src/utils/firebase/firestore.ts

import { db } from './config';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs,
  query,
  where
} from 'firebase/firestore';

export const addDocument = async (collectionName: string, data: any) => {
  return await addDoc(collection(db, collectionName), data);
};

export const updateDocument = async (collectionName: string, id: string, data: any) => {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, data);
};

export const deleteDocument = async (collectionName: string, id: string) => {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
};

export const getDocument = async (collectionName: string, id: string) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

export const getDocuments = async (collectionName: string) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const queryDocuments = async (collectionName: string, field: string, operator: any, value: any) => {
  const q = query(collection(db, collectionName), where(field, operator, value));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// more specific:
export interface Habit {
    id: string;
    name: string;
    createdAt: Date;
  }
  
  export const addHabit = async (userId: string, habitName: string): Promise<Habit> => {
    const habitData = {
      name: habitName,
      createdAt: new Date()
    };
    const userHabitsRef = collection(db, 'users', userId, 'habits');
    const docRef = await addDoc(userHabitsRef, habitData);
    return {
      id: docRef.id,
      ...habitData
    };
  };
  
  export const getUserHabits = async (userId: string): Promise<Habit[]> => {
    const userHabitsRef = collection(db, 'users', userId, 'habits');
    const querySnapshot = await getDocs(userHabitsRef);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Habit));
  };
  
  export const updateHabit = async (userId: string, habitId: string, newName: string): Promise<void> => {
    const habitRef = doc(db, 'users', userId, 'habits', habitId);
    await updateDoc(habitRef, { name: newName });
  };
  
  export const deleteHabit = async (userId: string, habitId: string): Promise<void> => {
    const habitRef = doc(db, 'users', userId, 'habits', habitId);
    await deleteDoc(habitRef);
  };