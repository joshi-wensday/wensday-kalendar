'use client'

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import HabitForm from '@/components/features/habits/HabitForm';
import HabitList from '@/components/features/habits/HabitList';
import { Habit, getUserHabits } from '@/utils/firebase/firestore';
import { User, UserProfile } from '@/utils/firebase/types';
import { FlamePointProvider } from '@/contexts/FlamePointContext';
import DailyHabitSummary from '@/components/features/habits/DailyHabitSummary';


export default function Dashboard() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const { user, userProfile } = useAuth();

  const fetchHabits = async () => {
    if (user) {
      const userHabits = await getUserHabits(user.uid);
      setHabits(userHabits);
    }
  };

  useEffect(() => {
    const fetchHabits = async () => {
      if (user) {
        console.log("Fetching habits for user", user.uid);
        try {
          const userHabits = await getUserHabits(user.uid);
          setHabits(userHabits);
        } catch (error) {
          console.error("Error fetching habits:", error);
        }
      }
    };
  
    fetchHabits();
  }, [user]);

  if (!userProfile) {
    return <div>Login or sign up to continue...</div>;
  }

  return (
    <ProtectedRoute>
      <FlamePointProvider>
        <div>
          <h1>Dashboard</h1>
          <p>Welcome, {userProfile.email}</p>
          <DailyHabitSummary />
          <HabitForm onHabitAdded={fetchHabits} />
          <HabitList habits={habits} onHabitDeleted={fetchHabits} />
        </div>
      </FlamePointProvider>
    </ProtectedRoute>
  );
}