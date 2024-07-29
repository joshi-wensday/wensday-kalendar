'use client'

import { Habit, deleteHabit } from '@/utils/firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    <div className="space-y-4">
      {habits.map((habit) => (
        <Card key={habit.id}>
          <CardHeader>
            <CardTitle>{habit.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" onClick={() => handleDelete(habit.id)}>Delete</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}