'use client'

import { Habit, deleteHabit } from '@/utils/firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';

export default function HabitList({ habits, onHabitDeleted }: { habits: Habit[], onHabitDeleted: () => void }) {
  const { user } = useAuth();

  const handleDelete = async (habitId: string) => {
    if (user) {
      try {
        await deleteHabit(user.uid, habitId);
        onHabitDeleted();
      } catch (error) {
        console.error('Error deleting habit:', error);
      }
    }
  };

  return (
    <ul>
      {habits.map((habit) => (
        <li key={habit.id}>
          {habit.name}
          <button onClick={() => handleDelete(habit.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}