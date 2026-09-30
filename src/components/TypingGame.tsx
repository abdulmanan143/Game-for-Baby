import React, { useState, useEffect, useCallback } from 'react';
import { Difficulty, PlayerStats } from '../types/game';
import { TYPING_CHALLENGES } from '../data/gameContent';
import { sounds, speakText } from '../utils/soundEffects';
import { ArrowLeft, RefreshCw, Trophy, Star, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TypingGameProps {
  difficulty: Difficulty;
  stats: PlayerStats;
  onFinishGame: (stars: number, score: number) => void;
  onBackToMenu: () => void;
}

const BALLOON_COLORS = [
  'from-red-400 to-rose-600 border-red-300',
  'from-amber-400 to-yellow-600 border-amber-300',
  'from-emerald-400 to-green-600 border-emerald-300',
  'from-cyan-400 to-blue-600 border-cyan-300',
  'from-purple-400 to-indigo-600 border-purple-300',
  'from-pink-400 to-rose-500 border-pink-300',
];

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

export const TypingGame: React.FC<TypingGameProps> = ({
  difficulty,
  stats,
  onFinishGame,
  onBackToMenu
}) => {
  const [wordList, setWordList] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedLetters, setTypedLetters] = useState<string>('');
  const [score, setScore] = useState(0);
  const [balloonsPopped, setBalloonsPopped] = useState(0);
  const [isPopping, setIsPopping] = useState(false);

  useEffect(() => {
    const list = [...(TYPING_CHALLENGES[difficulty] || TYPING_CHALLENGES.easy)];
    const shuffled = list.sort(() => 0.5 - Math.random()).slice(0, 10);
    setWordList(shuffled);
    setCurrentIndex(0);
    setTypedLetters('');
    setScore(0);
    setBalloonsPopped(0);
    setIsPopping(false);
  }, [difficulty]);

  const targetWord = wordList[currentIndex] || '';

  // Speak target word/letter when index changes
  useEffect(() => {
    if (targetWord && stats.voiceReadAloud) {
      const speech = targetWord.length === 1 ? `Press letter ${targetWord}` : `Spell ${targetWord}`;
      speakText(speech, true, stats.voiceSpeed);
    }
  }, [currentIndex, targetWord, stats.voiceReadAloud, stats.voiceSpeed]);

  const handleKeyPress = useCallback((letter: string) => {
    if (!targetWord || isPopping) return;
    const char = letter.toUpperCase();
    const neededChar = targetWord[typedLetters.length];

    if (char === neededChar) {
      sounds.playClick(stats.soundEnabled);
      const nextTyped = typedLetters + char;
      setTypedLetters(nextTyped);

      // Check if full word completed!
      if (nextTyped === targetWord) {
        setIsPopping(true);
        sounds.playPop(stats.soundEnabled);
        sounds.playStar(stats.soundEnabled);

        try {
          confetti({
            particleCount: 30,
            spread: 60,
            origin: { y: 0.5 }
          });
        } catch {}

        setScore((s) => s + 10);
        setBalloonsPopped((b) => b + 1);

        setTimeout(() => {
          setIsPopping(false);
          setTypedLetters('');
          if (currentIndex + 1 < wordList.length) {
            setCurrentIndex((i) => i + 1);
          } else {
            // Finished game!
            const stars = 3;
            onFinishGame(stars, score + 10);
          }
        }, 600);
      }
    } else {
      sounds.playWrong(stats.soundEnabled);
    }
  }, [targetWord, typedLetters, isPopping, stats.soundEnabled, currentIndex, wordList.length, onFinishGame, score]);

  // Physical keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        handleKeyPress(e.key.toUpperCase());
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);

  const currentColor = BALLOON_COLORS[currentIndex % BALLOON_COLORS.length];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top HUD */}
      <div className="bg-white rounded-2xl p-4 border-2 border-indigo-200 shadow-sm flex items-center justify-between gap-3">
        <button
          onClick={onBackToMenu}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Game</span>
        </button>

        <div className="flex items-center gap-1.5">
          {wordList.map((_, i) => (
            <div
              key={i}
              className={`h-2.5 rounded-full transition-all ${
                i === currentIndex
                  ? 'w-7 bg-indigo-500'
                  : i < currentIndex
                  ? 'w-2.5 bg-indigo-300'
                  : 'w-2.5 bg-slate-200'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200 text-xs font-black text-amber-900">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>{score} pts</span>
          </div>
          <span className="text-xs font-black text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded-md uppercase">
            {difficulty}
          </span>
        </div>
      </div>

      {/* Main Balloon Arena */}
      <div className="bg-gradient-to-b from-sky-100 to-indigo-50 rounded-3xl p-6 sm:p-8 border-4 border-indigo-300 shadow-lg text-center relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-black uppercase text-indigo-700 bg-white/80 px-3 py-1 rounded-full">
            ⌨️ Key Pop Quest · Balloon {currentIndex + 1} of {wordList.length}
          </div>
          <div className="text-xs font-bold text-slate-500">
            Use your keyboard or tap keys below!
          </div>
        </div>

        {/* Floating Balloon */}
        <div className="py-6 flex flex-col items-center justify-center min-h-[220px]">
          <div
            className={`relative w-40 h-48 sm:w-48 sm:h-56 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] bg-gradient-to-tr ${currentColor} border-4 shadow-xl flex flex-col items-center justify-center text-white transition-all duration-300 cursor-default select-none ${
              isPopping ? 'scale-150 opacity-0' : 'animate-float'
            }`}
          >
            {/* Balloon highlight glare */}
            <div className="absolute top-4 left-6 w-8 h-12 bg-white/30 rounded-full rotate-[-25deg] pointer-events-none" />

            {/* Word / Letter display */}
            <div className="text-3xl sm:text-4xl md:text-5xl font-black tracking-widest flex items-center justify-center gap-1 drop-shadow-md">
              {targetWord.split('').map((char, idx) => {
                const isMatched = idx < typedLetters.length;
                const isNext = idx === typedLetters.length;
                return (
                  <span
                    key={idx}
                    className={`inline-block transition-transform ${
                      isMatched
                        ? 'text-yellow-200 scale-110 drop-shadow-lg'
                        : isNext
                        ? 'text-white underline decoration-yellow-300 decoration-4 animate-pulse'
                        : 'text-white/70'
                    }`}
                  >
                    {char}
                  </span>
                );
              })}
            </div>

            {/* Balloon knot */}
            <div className="absolute -bottom-3 w-4 h-4 bg-inherit border-2 border-inherit rotate-45" />
          </div>
          {/* Balloon string */}
          <div className="w-0.5 h-12 bg-slate-400 mt-1" />
        </div>

        {/* Prompt */}
        <div className="mb-4">
          <p className="text-sm sm:text-base font-black text-slate-800">
            Type the letter: <span className="text-xl text-indigo-600 bg-white px-2 py-0.5 rounded-lg border border-indigo-200 ml-1">{targetWord[typedLetters.length]}</span>
          </p>
        </div>

        {/* Touch Keyboard for Tablets & Mobile */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-3 border-2 border-indigo-200 max-w-xl mx-auto space-y-2">
          {KEYBOARD_ROWS.map((row, rowIdx) => (
            <div key={rowIdx} className="flex justify-center gap-1 sm:gap-1.5">
              {row.map((letter) => {
                const isNextKey = targetWord[typedLetters.length] === letter;
                return (
                  <button
                    key={letter}
                    onClick={() => handleKeyPress(letter)}
                    className={`btn-3d w-8 h-10 sm:w-11 sm:h-12 rounded-xl font-black text-sm sm:text-base cursor-pointer select-none transition-all flex items-center justify-center ${
                      isNextKey
                        ? 'bg-amber-400 hover:bg-amber-300 text-amber-950 border-2 border-amber-500 scale-105 shadow-md'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
