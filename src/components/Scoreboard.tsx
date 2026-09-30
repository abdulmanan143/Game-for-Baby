import React, { useState } from 'react';
import { Difficulty, GameView, PlayerStats } from '../types/game';
import { CATEGORIES } from '../data/gameContent';
import { sounds } from '../utils/soundEffects';
import { ArrowLeft, Trophy, Star, Gamepad2, Award } from 'lucide-react';

interface ScoreboardProps {
  stats: PlayerStats;
  onNavigate: (view: GameView) => void;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({ stats, onNavigate }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('medium');

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Top Bar */}
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

        {/* Difficulty Filter */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-slate-200 shadow-xs">
          {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
            <button
              key={d}
              onClick={() => {
                sounds.playClick(stats.soundEnabled);
                setSelectedDifficulty(d);
              }}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs uppercase transition-colors cursor-pointer ${
                selectedDifficulty === d
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-5 border-2 border-amber-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl">
            ⭐
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400">Total Stars</div>
            <div className="text-2xl font-black text-slate-800 tabular-nums">
              {stats.totalStars}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border-2 border-emerald-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-2xl">
            🎮
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400">Games Played</div>
            <div className="text-2xl font-black text-slate-800 tabular-nums">
              {stats.totalGamesPlayed}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border-2 border-purple-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-2xl">
            🏆
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400">Badges Won</div>
            <div className="text-2xl font-black text-slate-800 tabular-nums">
              {stats.stickersUnlocked.length}
            </div>
          </div>
        </div>
      </div>

      {/* Category High Scores Table */}
      <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span>🎖️</span>
            <span>Category High Scores ({selectedDifficulty.toUpperCase()})</span>
          </h3>
        </div>

        <div className="divide-y divide-slate-100">
          {CATEGORIES.map((cat) => {
            const score = stats.highScores[cat.id]?.[selectedDifficulty] || 0;
            return (
              <div
                key={cat.id}
                className="py-4 flex items-center justify-between gap-4 hover:bg-slate-50/60 px-2 rounded-2xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-2xl">
                    {cat.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm sm:text-base">
                      {cat.name}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-xl font-black text-amber-900 text-sm tabular-nums flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                    <span>{score} pts</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
