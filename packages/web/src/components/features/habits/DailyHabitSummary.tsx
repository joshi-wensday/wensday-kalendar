'use client'

import { useFlamePoints } from '@/contexts/FlamePointContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function DailyHabitSummary() {
  const { flamePoints } = useFlamePoints();

  const totalPoints = flamePoints.total;
  const maxPoints = 100; // You might want to make this dynamic based on user goals

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Habit Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">Total Flame Points: {totalPoints}</p>
            <Progress value={(totalPoints / maxPoints) * 100} className="w-full" />
          </div>
          {Object.entries(flamePoints.byCategory).map(([category, points]) => (
            <div key={category}>
              <p className="text-sm font-medium">{category}: {points}</p>
              <Progress value={(points / maxPoints) * 100} className="w-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}