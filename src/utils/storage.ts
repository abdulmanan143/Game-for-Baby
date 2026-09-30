import { PlayerStats, CategoryId, Difficulty } from '../types/game';
import { INITIAL_STICKERS } from '../data/rewardsData';

const STORAGE_KEY = 'smart_kids_game_save_v1';

export const DEFAULT_STATS: PlayerStats = {
  totalStars: 0,
  totalGamesPlayed: 0,
  avatar: 'owl',
  playerName: 'Little Champion',
  highScores: {
    math: { easy: 0, medium: 0, hard: 0 },
    vocab: { easy: 0, medium: 0, hard: 0 },
    gk: { easy: 0, medium: 0, hard: 0 },
    memory: { easy: 0, medium: 0, hard: 0 },
    logic: { easy: 0, medium: 0, hard: 0 },
    typing: { easy: 0, medium: 0, hard: 0 },
  },
  stickersUnlocked: [],
  soundEnabled: true,
  musicEnabled: false,
  voiceReadAloud: true,
  voiceSpeed: 0.95
};

export function loadPlayerStats(): PlayerStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STATS,
      ...parsed,
      highScores: {
        ...DEFAULT_STATS.highScores,
        ...(parsed.highScores || {})
      }
    };
  } catch {
    return DEFAULT_STATS;
  }
}

export function savePlayerStats(stats: PlayerStats): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // Ignore storage quota errors
  }
}

export function recordGameResults(
  currentStats: PlayerStats,
  category: CategoryId,
  difficulty: Difficulty,
  starsEarned: number,
  scoreEarned: number
): { updatedStats: PlayerStats; newStickersUnlocked: string[] } {
  const currentBest = currentStats.highScores[category]?.[difficulty] || 0;
  const newBest = Math.max(currentBest, scoreEarned);

  const updatedTotalStars = currentStats.totalStars + starsEarned;
  const updatedGamesPlayed = currentStats.totalGamesPlayed + 1;

  const currentStickers = new Set(currentStats.stickersUnlocked);
  const newlyUnlocked: string[] = [];

  // Check stickers
  INITIAL_STICKERS.forEach((stk) => {
    if (!currentStickers.has(stk.id)) {
      let qualifies = false;
      if (stk.id === 'stk_first_win' && updatedGamesPlayed >= 1) qualifies = true;
      if (stk.category === 'all' && updatedTotalStars >= stk.starsRequired) qualifies = true;
      if (stk.category === category && updatedTotalStars >= stk.starsRequired) qualifies = true;

      if (qualifies) {
        currentStickers.add(stk.id);
        newlyUnlocked.push(stk.id);
      }
    }
  });

  const updatedStats: PlayerStats = {
    ...currentStats,
    totalStars: updatedTotalStars,
    totalGamesPlayed: updatedGamesPlayed,
    stickersUnlocked: Array.from(currentStickers),
    highScores: {
      ...currentStats.highScores,
      [category]: {
        ...currentStats.highScores[category],
        [difficulty]: newBest
      }
    }
  };

  savePlayerStats(updatedStats);
  return { updatedStats, newStickersUnlocked: newlyUnlocked };
}
