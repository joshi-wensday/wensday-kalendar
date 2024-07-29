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
  where,
  getDoc
} from 'firebase/firestore';
import { Habit, HabitAttribute, FlamePointRule } from '@shared/types/dataModels';

export const addHabit = async (userId: string, habitData: Omit<Habit, 'id' | 'userId' | 'createdAt'>): Promise<Habit> => {
  const newHabit: Omit<Habit, 'id'> = {
    ...habitData,
    userId,
    createdAt: new Date(),
    streakCount: 0,
    attributes: habitData.attributes || [],
    relatedSkills: habitData.relatedSkills || []
  };
  
  const userHabitsRef = collection(db, 'users', userId, 'habits');
  const docRef = await addDoc(userHabitsRef, newHabit);
  return {
    id: docRef.id,
    ...newHabit
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

export const updateHabit = async (userId: string, habitId: string, updatedData: Partial<Habit>): Promise<void> => {
  const habitRef = doc(db, 'users', userId, 'habits', habitId);
  await updateDoc(habitRef, updatedData);
};

export const deleteHabit = async (userId: string, habitId: string): Promise<void> => {
  const habitRef = doc(db, 'users', userId, 'habits', habitId);
  await deleteDoc(habitRef);
};

export const getCategories = async (userId: string): Promise<string[]> => {
  const userHabitsRef = collection(db, 'users', userId, 'habits');
  const querySnapshot = await getDocs(userHabitsRef);
  const categories = new Set<string>();
  querySnapshot.docs.forEach(doc => {
    const habit = doc.data() as Habit;
    categories.add(habit.category);
  });
  return Array.from(categories);
};

export const getSubcategories = async (userId: string, category: string): Promise<string[]> => {
  const userHabitsRef = collection(db, 'users', userId, 'habits');
  const q = query(userHabitsRef, where('category', '==', category));
  const querySnapshot = await getDocs(q);
  const subcategories = new Set<string>();
  querySnapshot.docs.forEach(doc => {
    const habit = doc.data() as Habit;
    if (habit.subcategory) {
      subcategories.add(habit.subcategory);
    }
  });
  return Array.from(subcategories);
};