'use client'

import { Habit, deleteHabit } from '@/utils/firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { useFlamePoints } from '@/contexts/FlamePointContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import HabitEntry from './HabitEntry';

export default function HabitList({ habits, onHabitDeleted }: { habits: Habit[], onHabitDeleted: () => void }) {
  const { user } = useAuth();
  const { removeFlamePoints } = useFlamePoints();

  const handleDelete = async (habit: Habit) => {
    if (user) {
      try {
        await deleteHabit(user.uid, habit.id);
        removeFlamePoints(habit.category, habit.flamePointRule.simpleConversion || 0);
        onHabitDeleted();
      } catch (error) {
        console.error('Error deleting habit:', error);
      }
    }
  };

  return (
    <div className="space-y-4">
      {habits.map((habit) => (
        <Card key={habit.id}>
          <CardHeader>
            <CardTitle>{habit.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <HabitEntry habit={habit} />
            <Button variant="destructive" onClick={() => handleDelete(habit)}>Delete</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}