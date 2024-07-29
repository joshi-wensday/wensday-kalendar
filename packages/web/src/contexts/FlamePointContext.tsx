// /packages/shared/src/contexts/FlamePointContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FlamePointSummary } from '@shared/types/dataModels';
import { calculateFlamePoints } from '../utils/flamePoint/flamePointCalculator';

interface FlamePointContextType {
  flamePoints: FlamePointSummary;
  addFlamePoints: (category: string, points: number) => void;
  calculateAndAddFlamePoints: (habitEntry: HabitEntry) => void;
}

const FlamePointContext = createContext<FlamePointContextType | undefined>(undefined);

export const FlamePointProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [flamePoints, setFlamePoints] = useState<FlamePointSummary>({
    total: 0,
    byCategory: {},
  });

  const addFlamePoints = (category: string, points: number) => {
    setFlamePoints(prev => ({
      total: prev.total + points,
      byCategory: {
        ...prev.byCategory,
        [category]: (prev.byCategory[category] || 0) + points,
      },
    }));
  };

  const calculateAndAddFlamePoints = (habitEntry: HabitEntry) => {
    const points = calculateFlamePoints(habitEntry);
    addFlamePoints(habitEntry.category, points);
  };

  return (
    <FlamePointContext.Provider value={{ flamePoints, addFlamePoints, calculateAndAddFlamePoints }}>
      {children}
    </FlamePointContext.Provider>
  );
};

export const useFlamePoints = () => {
  const context = useContext(FlamePointContext);
  if (context === undefined) {
    throw new Error('useFlamePoints must be used within a FlamePointProvider');
  }
  return context;
};