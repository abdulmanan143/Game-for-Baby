import { StickerReward } from '../types/game';

export const AVATAR_OPTIONS = [
  { id: 'owl', emoji: '🦉', name: 'Professor Hoot', role: 'Wise Owl' },
  { id: 'tiger', emoji: '🐯', name: 'Turbo Tiger', role: 'Speed Runner' },
  { id: 'bunny', emoji: '🐰', name: 'Bouncy Bunny', role: 'Hop Master' },
  { id: 'panda', emoji: '🐼', name: 'Cosmic Panda', role: 'Star Explorer' },
  { id: 'fox', emoji: '🦊', name: 'Clever Fox', role: 'Puzzle Solver' },
  { id: 'lion', emoji: '🦁', name: 'Brave Leo', role: 'Math Champ' },
  { id: 'robot', emoji: '🤖', name: 'Beep Bot', role: 'Tech Buddy' },
  { id: 'unicorn', emoji: '🦄', name: 'Sparkle Gem', role: 'Magic Dreamer' }
];

export const INITIAL_STICKERS: StickerReward[] = [
  {
    id: 'stk_first_win',
    title: 'First Step Champion',
    description: 'Played your very first game!',
    emoji: '🌱',
    category: 'all',
    starsRequired: 1,
    isUnlocked: false
  },
  {
    id: 'stk_math_whiz',
    title: 'Math Wizard',
    description: 'Score 5 stars in Math Magic!',
    emoji: '🧙‍♂️',
    category: 'math',
    starsRequired: 5,
    isUnlocked: false
  },
  {
    id: 'stk_word_master',
    title: 'Word Master',
    description: 'Score 5 stars in Word Quest!',
    emoji: '📖',
    category: 'vocab',
    starsRequired: 5,
    isUnlocked: false
  },
  {
    id: 'stk_world_scout',
    title: 'Planet Explorer',
    description: 'Score 5 stars in World Explorer!',
    emoji: '🚀',
    category: 'gk',
    starsRequired: 5,
    isUnlocked: false
  },
  {
    id: 'stk_memory_ace',
    title: 'Memory Genius',
    description: 'Solve a Memory Match game without hints!',
    emoji: '🧠',
    category: 'memory',
    starsRequired: 6,
    isUnlocked: false
  },
  {
    id: 'stk_logic_detective',
    title: 'Riddle Detective',
    description: 'Solve brain teasers and find the odd one out!',
    emoji: '🔍',
    category: 'logic',
    starsRequired: 5,
    isUnlocked: false
  },
  {
    id: 'stk_speedy_fingers',
    title: 'Lightning Keys',
    description: 'Pop 10 alphabet balloons in Key Pop Quest!',
    emoji: '⚡',
    category: 'typing',
    starsRequired: 5,
    isUnlocked: false
  },
  {
    id: 'stk_star_collector',
    title: 'Superstar Collector',
    description: 'Collect 25 total stars across all games!',
    emoji: '🌟',
    category: 'all',
    starsRequired: 25,
    isUnlocked: false
  },
  {
    id: 'stk_golden_crown',
    title: 'Grand Master King',
    description: 'Collect 50 total stars and master all categories!',
    emoji: '👑',
    category: 'all',
    starsRequired: 50,
    isUnlocked: false
  }
];
