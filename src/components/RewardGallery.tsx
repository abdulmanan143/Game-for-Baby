import React from 'react';
import { GameView, PlayerStats } from '../types/game';
import { INITIAL_STICKERS } from '../data/rewardsData';
import { sounds } from '../utils/soundEffects';
import { ArrowLeft, Trophy, Star, Lock, CheckCircle2, Sparkles } from 'lucide-react';

interface RewardGalleryProps {
  stats: PlayerStats;
  onNavigate: (view: GameView) => void;
}

export const RewardGallery: React.FC<RewardGalleryProps> = ({ stats, onNavigate }) => {
  const unlockedSet = new Set(stats.stickersUnlocked);

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            sounds.playClick(stats.soundEnabled);
            onNavigate('home');
          }}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-400 px-4 py-1.5 rounded-2xl border-2 border-amber-300 font-black text-amber-950 text-sm shadow-xs">
          <span>⭐</span>
          <span>{stats.totalStars} Stars in Bank</span>
        </div>
      </div>

      {/* Hero Showcase */}
      <div className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 rounded-3xl p-6 sm:p-8 text-amber-950 border-4 border-yellow-300 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-amber-950">
            <Trophy className="w-4 h-4 text-amber-900" />
            Kid Trophy Room
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-amber-950 tracking-tight">
            Stars & Sticker Album
          </h2>
          <p className="text-sm font-bold text-amber-900 max-w-md">
            Earn stars by playing games to unlock rare shiny stickers and badges!
          </p>
        </div>

        <div className="shrink-0 text-center bg-white/90 rounded-2xl p-4 border-2 border-amber-300 shadow-sm min-w-[140px]">
          <div className="text-3xl font-black text-amber-600 tabular-nums">
            {stats.stickersUnlocked.length}/{INITIAL_STICKERS.length}
          </div>
          <div className="text-xs font-black text-slate-600 uppercase mt-0.5">
            Badges Unlocked
          </div>
        </div>
      </div>

      {/* Stickers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {INITIAL_STICKERS.map((sticker) => {
          const isUnlocked = unlockedSet.has(sticker.id);

          return (
            <div
              key={sticker.id}
              className={`rounded-3xl p-5 border-3 transition-all relative overflow-hidden flex flex-col justify-between ${
                isUnlocked
                  ? 'bg-white border-amber-300 shadow-sm hover:shadow-md'
                  : 'bg-slate-50/80 border-slate-200 opacity-75'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-xs transition-transform ${
                      isUnlocked
                        ? 'bg-amber-100 border-2 border-amber-300 scale-105'
                        : 'bg-slate-200 grayscale opacity-40'
                    }`}
                  >
                    {sticker.emoji}
                  </div>

                  {isUnlocked ? (
                    <div className="flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-xl text-xs font-black">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Unlocked</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 bg-slate-200 text-slate-600 px-2.5 py-1 rounded-xl text-xs font-bold">
                      <Lock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{sticker.starsRequired} ⭐ needed</span>
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-black text-slate-900 mb-1">
                  {sticker.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {sticker.description}
                </p>
              </div>

              {!isUnlocked && (
                <div className="mt-4 pt-3 border-t border-slate-200">
                  <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1">
                    <span>Progress</span>
                    <span>{stats.totalStars} / {sticker.starsRequired} Stars</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all"
                      style={{
                        width: `${Math.min(100, (stats.totalStars / sticker.starsRequired) * 100)}%`
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
