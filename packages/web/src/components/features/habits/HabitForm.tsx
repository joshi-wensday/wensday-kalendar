'use client'

import { useState } from 'react';
import { addHabit } from '@/utils/firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';

export default function HabitForm({ onHabitAdded }: { onHabitAdded: () => void }) {
  const [habit, setHabit] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (habit.trim() && user) {
      try {
        await addHabit(user.uid, habit);
        setHabit('');
        onHabitAdded();
      } catch (error) {
        console.error('Error adding habit:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
        placeholder="Enter a new habit"
        required
      />
      <button type="submit">Add Habit</button>
    </form>
  );
}