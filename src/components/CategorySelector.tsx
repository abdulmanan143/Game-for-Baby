import React from 'react';
import { CategoryId, Difficulty, GameView, PlayerStats } from '../types/game';
import { CATEGORIES } from '../data/gameContent';
import { sounds, speakText } from '../utils/soundEffects';
import { ArrowLeft, Play, Star, Sparkles } from 'lucide-react';

interface CategorySelectorProps {
  difficulty: Difficulty;
  onSelectDifficulty: (d: Difficulty) => void;
  onSelectCategory: (c: CategoryId) => void;
  onNavigate: (view: GameView) => void;
  stats: PlayerStats;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  difficulty,
  onSelectDifficulty,
  onSelectCategory,
  onNavigate,
  stats
}) => {
  const handleDifficulty = (d: Difficulty) => {
    sounds.playClick(stats.soundEnabled);
    onSelectDifficulty(d);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Navigation */}
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

        {/* Difficulty Switcher */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-slate-200 shadow-xs">
          <button
            onClick={() => handleDifficulty('easy')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
              difficulty === 'easy'
                ? 'bg-emerald-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Easy (5–7)
          </button>
          <button
            onClick={() => handleDifficulty('medium')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
              difficulty === 'medium'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Medium (8–9)
          </button>
          <button
            onClick={() => handleDifficulty('hard')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
              difficulty === 'hard'
                ? 'bg-purple-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Hard (10–12)
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Choose Your Adventure! 🚀
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-semibold">
          Select a subject to play and earn stars!
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CATEGORIES.map((cat) => {
          const bestScore = stats.highScores[cat.id]?.[difficulty] || 0;

          return (
            <div
              key={cat.id}
              className="bg-white rounded-3xl p-6 border-2 border-slate-200 hover:border-amber-300 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-3 py-1 rounded-xl text-xs font-black text-amber-900">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                    <span>Best: {bestScore} pts</span>
                  </div>
                </div>

                <h3 className="text-2xl font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                  {cat.name}
                </h3>
                <div className="text-xs font-bold text-slate-400 mb-2">{cat.subtitle}</div>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {cat.description}
                </p>

                <div className="space-y-1.5 mb-6">
                  <div className="text-[11px] font-black uppercase text-slate-400 tracking-wider">
                    Skills Covered:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {cat.skillsTaught.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  sounds.playClick(stats.soundEnabled);
                  onSelectCategory(cat.id);
                }}
                className={`w-full py-3.5 px-4 rounded-xl font-black text-white text-base flex items-center justify-center gap-2 cursor-pointer btn-3d ${cat.buttonClass} bg-gradient-to-r ${cat.bgGradient}`}
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Play {cat.name}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
