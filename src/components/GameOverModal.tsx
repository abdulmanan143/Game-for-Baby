import React, { useEffect } from 'react';
import { CategoryId, Difficulty, GameView } from '../types/game';
import { CATEGORIES } from '../data/gameContent';
import { INITIAL_STICKERS } from '../data/rewardsData';
import { sounds, speakText } from '../utils/soundEffects';
import { Play, RotateCcw, Home, Trophy, Sparkles, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GameOverModalProps {
  category: CategoryId;
  difficulty: Difficulty;
  starsEarned: number;
  score: number;
  newStickers: string[];
  soundEnabled: boolean;
  voiceReadAloud: boolean;
  voiceSpeed: number;
  onPlayAgain: () => void;
  onNavigate: (view: GameView) => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  category,
  difficulty,
  starsEarned,
  score,
  newStickers,
  soundEnabled,
  voiceReadAloud,
  voiceSpeed,
  onPlayAgain,
  onNavigate
}) => {
  const catInfo = CATEGORIES.find((c) => c.id === category) || CATEGORIES[0];

  useEffect(() => {
    sounds.playLevelUp(soundEnabled);
    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.4 }
      });
    } catch {}

    if (voiceReadAloud) {
      const message = `Fantastic job! You finished ${catInfo.name} and earned ${starsEarned} stars!`;
      speakText(message, true, voiceSpeed);
    }
  }, [soundEnabled, voiceReadAloud, voiceSpeed, catInfo.name, starsEarned]);

  const unlockedStickerItems = INITIAL_STICKERS.filter((s) => newStickers.includes(s.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl border-4 border-amber-300 shadow-2xl max-w-lg w-full p-6 sm:p-8 text-center relative overflow-hidden space-y-6">
        {/* Golden Trophy Hero Image */}
        <div className="relative mx-auto w-32 h-32 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-4 border-amber-400 shadow-xl bg-amber-100 animate-float">
          <img
            src="/src/assets/images/kids_star_trophy_1790792701957.jpg"
            alt="Gold Star Trophy"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            You Did It! 🎉
          </h2>
          <p className="text-xs sm:text-sm font-bold text-slate-500">
            Completed <span className="text-amber-600">{catInfo.name}</span> ({difficulty} level)
          </p>
        </div>

        {/* 3-Star Rating Showcase */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 py-1">
          {[1, 2, 3].map((starNum) => {
            const isEarned = starNum <= starsEarned;
            return (
              <div
                key={starNum}
                className={`text-4xl sm:text-5xl transition-all transform ${
                  isEarned ? 'scale-110 drop-shadow-md animate-bounce' : 'opacity-30 grayscale'
                }`}
              >
                ⭐
              </div>
            );
          })}
        </div>

        {/* Score & Points Banner */}
        <div className="bg-amber-50 rounded-2xl p-3 border-2 border-amber-200 flex items-center justify-around text-center">
          <div>
            <div className="text-xs font-bold text-slate-500">Game Score</div>
            <div className="text-2xl font-black text-slate-900 tabular-nums">{score}</div>
          </div>
          <div className="w-px h-8 bg-amber-200" />
          <div>
            <div className="text-xs font-bold text-slate-500">Stars Earned</div>
            <div className="text-2xl font-black text-amber-600 flex items-center justify-center gap-1">
              <span>+{starsEarned}</span>
              <span>⭐</span>
            </div>
          </div>
        </div>

        {/* Unlocked Reward Badge Alert */}
        {unlockedStickerItems.length > 0 && (
          <div className="bg-gradient-to-r from-yellow-100 to-amber-100 rounded-2xl p-3.5 border-2 border-yellow-300 text-left flex items-center gap-3">
            <div className="text-3xl sm:text-4xl shrink-0">
              {unlockedStickerItems[0].emoji}
            </div>
            <div>
              <div className="text-[11px] font-black uppercase text-amber-800 tracking-wider">
                🌟 New Reward Unlocked!
              </div>
              <div className="text-sm font-black text-slate-900">
                {unlockedStickerItems[0].title}
              </div>
              <div className="text-xs text-slate-600">
                {unlockedStickerItems[0].description}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              sounds.playClick(soundEnabled);
              onPlayAgain();
            }}
            className="btn-3d btn-3d-amber w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-base px-6 py-3 rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Again</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick(soundEnabled);
              onNavigate('categories');
            }}
            className="btn-3d btn-3d-emerald w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-black text-base px-6 py-3 rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Next Category</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick(soundEnabled);
              onNavigate('home');
            }}
            className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-base px-4 py-3 rounded-2xl flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};
