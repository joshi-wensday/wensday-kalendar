// User related interfaces
interface User {
    id: string;
    email: string;
    name: string;
    profilePicture: string;
  }
  
  interface Dream {
    id: string;
    title: string;
    description: string;
  }
  
  interface UserPreferences {
    // Add user preference fields
  }
  
  // Habit related interfaces
  interface Habit {
    id: string;
    userId: string;
    name: string;
    category: string;
    subcategory?: string;
    flamePointConversion: FlamePointRule;
    streakCount?: number;
    attributes: HabitAttribute[];
    relatedSkills: string[];
  }
  
  interface FlamePointRule {
    type: 'simple' | 'tiered';
    simpleConversion?: number;
    tieredConversion?: TieredConversion[];
  }
  
  interface TieredConversion {
    threshold: number;
    flamePoints: number;
  }
  
  interface HabitAttribute {
    name: string;
    value: number;
  }
  
  // Daily log related interfaces
  interface DailyLog {
    id: string;
    userId: string;
    date: Date;
    habits: HabitEntry[];
    quests: QuestEntry[];
    notes: string;
    lessons: string[];
    flamePoints: FlamePointSummary;
    routines: RoutineCompletion;
    dailyIntention: string;
    sleepTimes: SleepTimes;
  }
  
  interface HabitEntry { 
    habitId: string; 
    repValue: number; 
    attributes: HabitAttribute[]; 
    flamePointRule: FlamePointRule; 
  }
  
  interface QuestEntry {
    questId: string;
    status: 'completed' | 'in-progress' | 'not-started';
  }
  
  interface FlamePointSummary {
    total: number;
    byCategory: { [category: string]: number };
  }
  
  interface RoutineCompletion {
    morning: boolean;
    evening: boolean;
    night: boolean;
  }
  
  interface SleepTimes {
    sleepTime: string; // Format: "HH:MM" (24+ hour clock)
    wakeTime: string;
    naps?: Nap[];
  }
  
  interface Nap {
    startTime: string;
    duration: number; // in minutes
  }
  
  // Add interfaces for WeeklyLog, MonthlyLog, Quest, and Goal as needed