import React, { useState, useEffect } from 'react';
import { Difficulty, PlayerStats } from '../types/game';
import { MEMORY_CARD_PAIRS } from '../data/gameContent';
import { sounds, speakText } from '../utils/soundEffects';
import { ArrowLeft, RefreshCw, Trophy, Sparkles, Star, Timer, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MemoryCardItem {
  id: string;
  pairKey: string;
  label: string;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryGameProps {
  difficulty: Difficulty;
  stats: PlayerStats;
  onFinishGame: (stars: number, score: number) => void;
  onBackToMenu: () => void;
}

type ThemeKey = 'animals' | 'space' | 'fruits' | 'math';

export const MemoryGame: React.FC<MemoryGameProps> = ({
  difficulty,
  stats,
  onFinishGame,
  onBackToMenu
}) => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeKey>('animals');
  const [cards, setCards] = useState<MemoryCardItem[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [totalPairs, setTotalPairs] = useState(4);
  const [isLocked, setIsLocked] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  // Initialize deck based on theme and difficulty
  const initializeDeck = () => {
    // Number of pairs
    const pairsCount = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 6 : 8;
    setTotalPairs(pairsCount);

    const themePool = MEMORY_CARD_PAIRS[selectedTheme] || MEMORY_CARD_PAIRS.animals;
    const pickedPairs = themePool.slice(0, pairsCount);

    const deck: MemoryCardItem[] = [];
    pickedPairs.forEach((item, idx) => {
      // First card of pair
      deck.push({
        id: `card_${idx}_a`,
        pairKey: `pair_${idx}`,
        label: item.label,
        content: item.content,
        isFlipped: false,
        isMatched: false
      });
      // Second card of pair
      deck.push({
        id: `card_${idx}_b`,
        pairKey: `pair_${idx}`,
        label: item.label,
        content: item.content,
        isFlipped: false,
        isMatched: false
      });
    });

    // Shuffle
    const shuffled = deck.sort(() => 0.5 - Math.random());
    setCards(shuffled);
    setFlippedIndices([]);
    setMoves(0);
    setMatchedPairs(0);
    setIsLocked(false);
    setSeconds(0);
    setIsGameOver(false);
  };

  useEffect(() => {
    initializeDeck();
  }, [selectedTheme, difficulty]);

  // Game timer
  useEffect(() => {
    if (isGameOver) return;
    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isGameOver]);

  const handleCardClick = (index: number) => {
    if (isLocked || isGameOver) return;
    const card = cards[index];
    if (card.isFlipped || card.isMatched) return;

    sounds.playCardFlip(stats.soundEnabled);

    // Flip card
    const updated = [...cards];
    updated[index].isFlipped = true;
    setCards(updated);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setIsLocked(true);
      setMoves((m) => m + 1);

      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = updated[firstIdx];
      const secondCard = updated[secondIdx];

      if (firstCard.pairKey === secondCard.pairKey) {
        // MATCH!
        sounds.playCorrect(stats.soundEnabled);
        setTimeout(() => {
          firstCard.isMatched = true;
          secondCard.isMatched = true;
          setCards([...updated]);
          setFlippedIndices([]);
          setIsLocked(false);
          const newMatched = matchedPairs + 1;
          setMatchedPairs(newMatched);

          if (stats.voiceReadAloud) {
            speakText(`Matched ${firstCard.label}!`, true, stats.voiceSpeed);
          }

          // Check if won
          if (newMatched >= totalPairs) {
            setIsGameOver(true);
            sounds.playLevelUp(stats.soundEnabled);
            try {
              confetti({ particleCount: 75, spread: 80, origin: { y: 0.5 } });
            } catch {}

            // Calculate stars based on moves
            const perfectMoves = totalPairs + 2;
            const stars = moves <= perfectMoves ? 3 : moves <= totalPairs * 2 ? 2 : 1;
            const finalScore = Math.max(20, 100 - moves * 4);
            onFinishGame(stars, finalScore);
          }
        }, 500);
      } else {
        // NO MATCH
        sounds.playWrong(stats.soundEnabled);
        setTimeout(() => {
          firstCard.isFlipped = false;
          secondCard.isFlipped = false;
          setCards([...updated]);
          setFlippedIndices([]);
          setIsLocked(false);
        }, 900);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top HUD */}
      <div className="bg-white rounded-2xl p-4 border-2 border-purple-200 shadow-sm flex items-center justify-between gap-3 flex-wrap">
        <button
          onClick={onBackToMenu}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Game</span>
        </button>

        {/* Theme Picker */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setSelectedTheme('animals')}
            className={`px-2.5 py-1 text-xs font-black rounded-lg transition-colors cursor-pointer ${
              selectedTheme === 'animals' ? 'bg-white text-purple-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            🦁 Safari
          </button>
          <button
            onClick={() => setSelectedTheme('space')}
            className={`px-2.5 py-1 text-xs font-black rounded-lg transition-colors cursor-pointer ${
              selectedTheme === 'space' ? 'bg-white text-purple-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            🚀 Space
          </button>
          <button
            onClick={() => setSelectedTheme('fruits')}
            className={`px-2.5 py-1 text-xs font-black rounded-lg transition-colors cursor-pointer ${
              selectedTheme === 'fruits' ? 'bg-white text-purple-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            🍓 Fruits
          </button>
          <button
            onClick={() => setSelectedTheme('math')}
            className={`px-2.5 py-1 text-xs font-black rounded-lg transition-colors cursor-pointer ${
              selectedTheme === 'math' ? 'bg-white text-purple-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            ➕ Math
          </button>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs font-black">
          <div className="flex items-center gap-1 bg-purple-50 text-purple-900 px-2.5 py-1 rounded-xl border border-purple-200">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Pairs: {matchedPairs}/{totalPairs}</span>
          </div>

          <div className="flex items-center gap-1 bg-amber-50 text-amber-900 px-2.5 py-1 rounded-xl border border-amber-200">
            <Timer className="w-3.5 h-3.5 text-amber-600" />
            <span className="tabular-nums">{seconds}s</span>
          </div>

          <button
            onClick={initializeDeck}
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer"
            title="Reset Game"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Memory Cards Board */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-purple-300 shadow-lg">
        <div className="text-center mb-5">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Find the Matching Pairs! 🃏
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold">
            Tap cards to flip them. Remember where each item is hiding!
          </p>
        </div>

        {/* Dynamic Card Grid */}
        <div
          className={`grid gap-3 sm:gap-4 max-w-2xl mx-auto ${
            cards.length <= 8
              ? 'grid-cols-4'
              : cards.length <= 12
              ? 'grid-cols-4 sm:grid-cols-4'
              : 'grid-cols-4 sm:grid-cols-4'
          }`}
        >
          {cards.map((card, index) => {
            const isRevealed = card.isFlipped || card.isMatched;

            return (
              <button
                key={card.id}
                disabled={card.isMatched || isLocked}
                onClick={() => handleCardClick(index)}
                className={`relative aspect-square rounded-2xl sm:rounded-3xl border-3 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 transform select-none ${
                  isRevealed
                    ? card.isMatched
                      ? 'bg-emerald-100 border-emerald-400 scale-95 opacity-80 ring-2 ring-emerald-200'
                      : 'bg-white border-purple-400 shadow-lg scale-102 ring-4 ring-purple-100'
                    : 'bg-gradient-to-tr from-purple-500 to-indigo-600 border-purple-400 hover:from-purple-400 hover:to-indigo-500 text-white shadow-md active:scale-95'
                }`}
              >
                {isRevealed ? (
                  <div className="flex flex-col items-center justify-center text-center p-1">
                    <span className="text-3xl sm:text-4xl md:text-5xl drop-shadow-xs">
                      {card.content}
                    </span>
                    <span className="text-[10px] sm:text-xs font-black text-slate-700 mt-1 truncate max-w-full px-1">
                      {card.label}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-2xl sm:text-3xl opacity-80">❓</span>
                    <span className="text-[9px] sm:text-[10px] font-black tracking-widest uppercase opacity-60 mt-0.5">
                      TAP
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
