export interface User {
    id: string;
    email: string;
    name: string;
    profilePicture: string;
}
export interface Dream {
    id: string;
    title: string;
    description: string;
}
export interface UserPreferences {
}
export interface Habit {
    id: string;
    userId: string;
    name: string;
    category: string;
    subcategory?: string;
    flamePointConversion: FlamePointRule;
    streakCount?: number;
    attributes: HabitAttribute[];
    relatedSkills: string[];
    createdAt: Date;
}
export interface FlamePointRule {
    type: 'simple' | 'tiered';
    simpleConversion?: number;
    tieredConversion?: TieredConversion[];
}
export interface TieredConversion {
    threshold: number;
    flamePoints: number;
}
export interface HabitAttribute {
    name: string;
    value: number;
}
export interface DailyLog {
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
export interface HabitEntry {
    habitId: string;
    repValue: number;
    attributes: HabitAttribute[];
    flamePointRule: FlamePointRule;
}
export interface QuestEntry {
    questId: string;
    status: 'completed' | 'in-progress' | 'not-started';
}
export interface FlamePointSummary {
    total: number;
    byCategory: {
        [category: string]: number;
    };
}
export interface RoutineCompletion {
    morning: boolean;
    evening: boolean;
    night: boolean;
}
export interface SleepTimes {
    sleepTime: string;
    wakeTime: string;
    naps?: Nap[];
}
export interface Nap {
    startTime: string;
    duration: number;
}
