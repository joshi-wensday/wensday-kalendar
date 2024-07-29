'use client'

import { useState } from 'react';
import { useFlamePoints } from '@/contexts/FlamePointContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Habit } from '@/utils/firebase/firestore';

interface Props {
  habit: Habit;
}

export default function HabitEntry({ habit }: Props) {
  const [repValue, setRepValue] = useState(0);
  const { addFlamePoints } = useFlamePoints();

  const handleSubmit = () => {
    const points = repValue * (habit.flamePointRule.simpleConversion || 1);
    addFlamePoints(habit.category, points);
    setRepValue(0);
  };

  return (
    <div className="flex items-center space-x-2">
      <Input
        type="number"
        value={repValue}
        onChange={(e) => setRepValue(parseInt(e.target.value))}
        placeholder="Reps"
        className="w-20"
      />
      <Button onClick={handleSubmit}>Log</Button>
    </div>
  );
}