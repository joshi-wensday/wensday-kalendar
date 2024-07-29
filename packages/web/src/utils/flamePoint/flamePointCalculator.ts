// /packages/shared/src/utils/flamePointCalculator.ts

import { FlamePointRule, HabitEntry } from '@shared/types/dataModels';

export function calculateFlamePoints(habitEntry: HabitEntry): number {
  const { repValue, flamePointRule } = habitEntry;

  if (flamePointRule.type === 'simple') {
    return repValue * (flamePointRule.simpleConversion || 1);
  } else if (flamePointRule.type === 'tiered') {
    let totalPoints = 0;
    let remainingReps = repValue;

    flamePointRule.tieredConversion?.forEach(tier => {
      if (remainingReps > 0) {
        const repsInTier = Math.min(remainingReps, tier.threshold);
        totalPoints += repsInTier * tier.flamePoints;
        remainingReps -= repsInTier;
      }
    });

    return totalPoints;
  }

  return 0;
}