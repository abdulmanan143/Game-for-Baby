export type Difficulty = 'easy' | 'medium' | 'hard';

export type CategoryId = 'math' | 'vocab' | 'gk' | 'memory' | 'logic' | 'typing';

export type GameView = 
  | 'home' 
  | 'categories' 
  | 'play_math' 
  | 'play_vocab' 
  | 'play_gk' 
  | 'play_memory' 
  | 'play_logic' 
  | 'play_typing' 
  | 'rewards' 
  | 'scores' 
  | 'settings' 
  | 'help';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  subtitle: string;
  icon: string;
  themeColor: string;
  bgGradient: string;
  buttonClass: string;
  description: string;
  skillsTaught: string[];
}

export interface QuizQuestion {
  id: string;
  category: CategoryId;
  difficulty: Difficulty;
  type: 'mcq' | 'compare' | 'sequence' | 'count' | 'missing_letter' | 'odd_one_out';
  question: string;
  hint?: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  visualData?: {
    fruitEmoji?: string;
    fruitCount?: number;
    sequence?: (number | string)[];
    items?: { emoji: string; label: string }[];
    missingLetterWord?: string;
    missingIndex?: number;
  };
}

export interface MemoryCard {
  id: string;
  pairId: string;
  label: string;
  content: string; // emoji or text
  type: 'emoji' | 'text';
  isFlipped: boolean;
  isMatched: boolean;
}

export interface StickerReward {
  id: string;
  title: string;
  description: string;
  emoji: string;
  category: CategoryId | 'all';
  starsRequired: number;
  isUnlocked: boolean;
  unlockedAt?: string;
}

export interface PlayerStats {
  totalStars: number;
  totalGamesPlayed: number;
  avatar: string;
  playerName: string;
  highScores: Record<CategoryId, Record<Difficulty, number>>;
  stickersUnlocked: string[];
  soundEnabled: boolean;
  musicEnabled: boolean;
  voiceReadAloud: boolean;
  voiceSpeed: number; // 0.8 to 1.2
}
