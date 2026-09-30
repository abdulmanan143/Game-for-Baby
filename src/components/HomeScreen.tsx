import React from 'react';
import { CategoryId, Difficulty, GameView, PlayerStats } from '../types/game';
import { CATEGORIES } from '../data/gameContent';
import { AVATAR_OPTIONS } from '../data/rewardsData';
import { sounds, speakText } from '../utils/soundEffects';
import { Play, Sparkles, Trophy, Star, Award, Compass, Volume2, ShieldCheck, Heart } from 'lucide-react';

interface HomeScreenProps {
  difficulty: Difficulty;
  onSelectDifficulty: (d: Difficulty) => void;
  onSelectCategory: (c: CategoryId) => void;
  onNavigate: (view: GameView) => void;
  stats: PlayerStats;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  difficulty,
  onSelectDifficulty,
  onSelectCategory,
  onNavigate,
  stats
}) => {
  const currentAvatar = AVATAR_OPTIONS.find((a) => a.id === stats.avatar) || AVATAR_OPTIONS[0];

  const handleDifficultyClick = (d: Difficulty) => {
    sounds.playClick(stats.soundEnabled);
    onSelectDifficulty(d);
    const label = d === 'easy' ? 'Easy level for ages 5 to 7' : d === 'medium' ? 'Medium level for ages 8 to 9' : 'Hard level for ages 10 to 12';
    if (stats.voiceReadAloud) {
      speakText(label, true, stats.voiceSpeed);
    }
  };

  const handleQuickPlay = () => {
    sounds.playStar(stats.soundEnabled);
    // Play math or current active category
    onSelectCategory('math');
  };

  const handleCategoryClick = (catId: CategoryId) => {
    sounds.playClick(stats.soundEnabled);
    onSelectCategory(catId);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Presentation Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 text-white shadow-xl border-4 border-amber-300 p-6 sm:p-8 md:p-10">
        {/* Background decorative landscape scrim */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
          <img
            src="/src/assets/images/kids_game_landscape_1790792713878.jpg"
            alt="Cartoon landscape"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/25 backdrop-blur-md px-3.5 py-1 rounded-full text-xs sm:text-sm font-black tracking-wide text-amber-950 uppercase">
              <Sparkles className="w-4 h-4 text-amber-200 animate-spin" />
              Fun • Safe • 100% Ad-Free
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white drop-shadow-md">
              Learn & Play, <br />
              <span className="text-yellow-200">The Smart Fun Way!</span>
            </h2>

            <p className="text-amber-100 text-sm sm:text-base font-semibold max-w-lg leading-relaxed">
              Explore numbers, words, memory cards, and cool science trivia! Designed for kids aged 5 to 12 to build confidence and have a blast.
            </p>

            {/* Quick Play Action Button */}
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={handleQuickPlay}
                className="btn-3d btn-3d-amber bg-yellow-300 hover:bg-yellow-200 text-amber-950 font-black text-lg sm:text-xl px-7 py-3.5 rounded-2xl flex items-center gap-3 cursor-pointer transform hover:scale-105"
              >
                <div className="w-8 h-8 rounded-full bg-amber-950 text-yellow-300 flex items-center justify-center">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <span>Play Game Now</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick(stats.soundEnabled);
                  onNavigate('rewards');
                }}
                className="bg-white/20 hover:bg-white/30 text-white font-bold text-sm sm:text-base px-5 py-3 rounded-2xl border-2 border-white/40 flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
              >
                <Trophy className="w-5 h-5 text-yellow-200" />
                <span>My Rewards & Stars</span>
              </button>
            </div>
          </div>

          {/* Mascot Portrait Card */}
          <div className="relative shrink-0 flex flex-col items-center">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-amber-200 animate-float">
              <img
                src="/src/assets/images/kids_mascot_owl_1790792690727.jpg"
                alt="Professor Owl Mascot"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-3 bg-white text-slate-800 px-4 py-1.5 rounded-2xl shadow-md border-2 border-amber-300 font-extrabold text-xs sm:text-sm flex items-center gap-1.5">
              <span>{currentAvatar.emoji}</span>
              <span>Hello, {stats.playerName}!</span>
            </div>
          </div>
        </div>
      </section>

      {/* Select Difficulty Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border-2 border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2">
              <span>🎯</span>
              <span>Select Difficulty Level</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Choose the right age and challenge level for you!
            </p>
          </div>

          <div className="text-xs font-bold text-slate-400">
            Selected: <span className="text-amber-600 uppercase font-black">{difficulty}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {/* Easy Button */}
          <button
            onClick={() => handleDifficultyClick('easy')}
            className={`p-4 rounded-2xl border-3 text-left transition-all cursor-pointer relative ${
              difficulty === 'easy'
                ? 'border-emerald-500 bg-emerald-50 shadow-md ring-2 ring-emerald-300 scale-[1.02]'
                : 'border-slate-200 hover:border-emerald-300 bg-white hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-2xl">🌱</span>
              <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Ages 5–7
              </span>
            </div>
            <h4 className="text-lg font-black text-emerald-950">1. Easy</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Counting with fruits, single digits, 3-letter words, gentle memory cards.
            </p>
          </button>

          {/* Medium Button */}
          <button
            onClick={() => handleDifficultyClick('medium')}
            className={`p-4 rounded-2xl border-3 text-left transition-all cursor-pointer relative ${
              difficulty === 'medium'
                ? 'border-amber-500 bg-amber-50 shadow-md ring-2 ring-amber-300 scale-[1.02]'
                : 'border-slate-200 hover:border-amber-300 bg-white hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-2xl">🚀</span>
              <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                Ages 8–9
              </span>
            </div>
            <h4 className="text-lg font-black text-amber-950">2. Medium</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Multiplication, number sequences, vocabulary opposites, 12-card memory.
            </p>
          </button>

          {/* Hard Button */}
          <button
            onClick={() => handleDifficultyClick('hard')}
            className={`p-4 rounded-2xl border-3 text-left transition-all cursor-pointer relative ${
              difficulty === 'hard'
                ? 'border-purple-500 bg-purple-50 shadow-md ring-2 ring-purple-300 scale-[1.02]'
                : 'border-slate-200 hover:border-purple-300 bg-white hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-2xl">🏆</span>
              <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
                Ages 10–12
              </span>
            </div>
            <h4 className="text-lg font-black text-purple-950">3. Hard</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Two-digit math, science trivia, tricky riddles, and typing speed challenges!
            </p>
          </button>
        </div>
      </section>

      {/* Select Category Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800 flex items-center gap-2">
              <span>🎮</span>
              <span>Select Category</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Pick your favorite subject or try them all!
            </p>
          </div>

          <button
            onClick={() => {
              sounds.playClick(stats.soundEnabled);
              onNavigate('categories');
            }}
            className="text-xs sm:text-sm font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {CATEGORIES.map((cat) => {
            const bestScore = stats.highScores[cat.id]?.[difficulty] || 0;
            return (
              <div
                key={cat.id}
                className="bg-white rounded-3xl p-5 border-2 border-slate-200 hover:border-amber-300 shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                      {cat.icon}
                    </div>
                    <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl text-xs font-bold text-amber-800">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                      <span>Best: {bestScore} pts</span>
                    </div>
                  </div>

                  <h4 className="text-xl font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                    {cat.name}
                  </h4>
                  <p className="text-xs font-bold text-slate-400 mb-2">{cat.subtitle}</p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {cat.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {cat.skillsTaught.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`w-full py-3 px-4 rounded-xl font-black text-white text-sm flex items-center justify-center gap-2 cursor-pointer btn-3d ${cat.buttonClass} bg-gradient-to-r ${cat.bgGradient}`}
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Play {cat.name}</span>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Player Bar: My Score, Rewards, Settings, Help */}
      <section className="bg-gradient-to-r from-amber-100/60 to-yellow-100/60 rounded-3xl p-5 border-2 border-amber-200">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <button
            onClick={() => {
              sounds.playClick(stats.soundEnabled);
              onNavigate('scores');
            }}
            className="p-3 bg-white rounded-2xl border border-amber-200 hover:border-amber-400 shadow-xs cursor-pointer hover:scale-105 transition-transform"
          >
            <div className="text-2xl mb-1">⭐</div>
            <div className="text-lg font-black text-slate-800 tabular-nums">{stats.totalStars}</div>
            <div className="text-xs font-bold text-slate-500">Stars Earned</div>
          </button>

          <button
            onClick={() => {
              sounds.playClick(stats.soundEnabled);
              onNavigate('rewards');
            }}
            className="p-3 bg-white rounded-2xl border border-amber-200 hover:border-amber-400 shadow-xs cursor-pointer hover:scale-105 transition-transform"
          >
            <div className="text-2xl mb-1">🏆</div>
            <div className="text-lg font-black text-slate-800 tabular-nums">
              {stats.stickersUnlocked.length}
            </div>
            <div className="text-xs font-bold text-slate-500">Rewards Unlocked</div>
          </button>

          <button
            onClick={() => {
              sounds.playClick(stats.soundEnabled);
              onNavigate('settings');
            }}
            className="p-3 bg-white rounded-2xl border border-amber-200 hover:border-amber-400 shadow-xs cursor-pointer hover:scale-105 transition-transform"
          >
            <div className="text-2xl mb-1">⚙️</div>
            <div className="text-sm font-black text-slate-800 mt-1">Sound & Avatar</div>
            <div className="text-xs font-bold text-slate-500">Settings</div>
          </button>

          <button
            onClick={() => {
              sounds.playClick(stats.soundEnabled);
              onNavigate('help');
            }}
            className="p-3 bg-white rounded-2xl border border-amber-200 hover:border-amber-400 shadow-xs cursor-pointer hover:scale-105 transition-transform"
          >
            <div className="text-2xl mb-1">💡</div>
            <div className="text-sm font-black text-slate-800 mt-1">How to Play</div>
            <div className="text-xs font-bold text-slate-500">Help & Tips</div>
          </button>
        </div>
      </section>
    </div>
  );
};
