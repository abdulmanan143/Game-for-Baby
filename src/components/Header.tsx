import React from 'react';
import { GameView, PlayerStats } from '../types/game';
import { AVATAR_OPTIONS } from '../data/rewardsData';
import { sounds, speakText } from '../utils/soundEffects';
import { Volume2, VolumeX, Mic, MicOff, Trophy, HelpCircle, Settings, Home, Compass } from 'lucide-react';

interface HeaderProps {
  currentView: GameView;
  onNavigate: (view: GameView) => void;
  stats: PlayerStats;
  onUpdateStats: (newStats: Partial<PlayerStats>) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  stats,
  onUpdateStats
}) => {
  const currentAvatar = AVATAR_OPTIONS.find((a) => a.id === stats.avatar) || AVATAR_OPTIONS[0];

  const toggleSound = () => {
    const nextState = !stats.soundEnabled;
    onUpdateStats({ soundEnabled: nextState });
    if (nextState) {
      sounds.playClick(true);
    }
  };

  const toggleVoice = () => {
    const nextState = !stats.voiceReadAloud;
    onUpdateStats({ voiceReadAloud: nextState });
    if (nextState) {
      sounds.playClick(stats.soundEnabled);
      speakText('Voice reading is turned on!', true, stats.voiceSpeed);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-4 border-amber-200 shadow-sm px-3 sm:px-6 py-2.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Brand Zone: 1 line title and mascot button */}
        <button
          onClick={() => {
            sounds.playClick(stats.soundEnabled);
            onNavigate('home');
          }}
          className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
          title="Return to Home"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-2xl shadow-md border-2 border-white transform group-hover:scale-105 transition-transform">
            🌟
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight leading-none group-hover:text-amber-600 transition-colors">
              Smart Kids
            </h1>
            <p className="text-[11px] sm:text-xs font-bold text-amber-600 tracking-wide leading-none mt-0.5">
              Fun Learning Game
            </p>
          </div>
        </button>

        {/* Clean Nav Zone */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          <button
            onClick={() => {
              sounds.playClick(stats.soundEnabled);
              onNavigate('home');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
              currentView === 'home'
                ? 'bg-amber-100 text-amber-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Home className="w-4 h-4 text-amber-500" />
            Home
          </button>

          <button
            onClick={() => {
              sounds.playClick(stats.soundEnabled);
              onNavigate('categories');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
              currentView === 'categories'
                ? 'bg-amber-100 text-amber-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-4 h-4 text-teal-500" />
            Categories
          </button>

          <button
            onClick={() => {
              sounds.playClick(stats.soundEnabled);
              onNavigate('rewards');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
              currentView === 'rewards'
                ? 'bg-amber-100 text-amber-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Trophy className="w-4 h-4 text-yellow-500" />
            Rewards
          </button>

          <button
            onClick={() => {
              sounds.playClick(stats.soundEnabled);
              onNavigate('scores');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
              currentView === 'scores'
                ? 'bg-amber-100 text-amber-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            ⭐ Scores
          </button>
        </nav>

        {/* Action Controls & Kid Stars counter */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Audio Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label={stats.soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-800 flex items-center justify-center transition-colors cursor-pointer"
            title={stats.soundEnabled ? 'Sound is ON' : 'Sound is OFF'}
          >
            {stats.soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Voice Read Aloud Toggle */}
          <button
            onClick={toggleVoice}
            aria-label={stats.voiceReadAloud ? 'Turn off voice reader' : 'Turn on voice reader'}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-800 flex items-center justify-center transition-colors cursor-pointer"
            title={stats.voiceReadAloud ? 'Voice read-aloud is ON' : 'Voice read-aloud is OFF'}
          >
            {stats.voiceReadAloud ? <Mic className="w-4 h-4 text-indigo-600" /> : <MicOff className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Total Stars Counter */}
          <button
            onClick={() => {
              sounds.playStar(stats.soundEnabled);
              onNavigate('rewards');
            }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-yellow-400 px-3 py-1.5 rounded-2xl shadow-xs border-2 border-amber-300 font-extrabold text-amber-950 text-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Your Star Bank"
          >
            <span className="text-base animate-pulse-gentle">⭐</span>
            <span className="tabular-nums tracking-wide">{stats.totalStars}</span>
          </button>

          {/* Avatar button */}
          <button
            onClick={() => {
              sounds.playClick(stats.soundEnabled);
              onNavigate('settings');
            }}
            className="w-10 h-10 rounded-2xl bg-amber-100 hover:bg-amber-200 border-2 border-amber-400 flex items-center justify-center text-xl shadow-xs transition-transform active:scale-95 cursor-pointer"
            title={`Playing as ${currentAvatar.name} (Click to change)`}
          >
            {currentAvatar.emoji}
          </button>

          {/* Settings & Help for mobile */}
          <button
            onClick={() => {
              sounds.playClick(stats.soundEnabled);
              onNavigate('settings');
            }}
            aria-label="Game Settings"
            className="w-9 h-9 hidden sm:flex rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 items-center justify-center cursor-pointer"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              sounds.playClick(stats.soundEnabled);
              onNavigate('help');
            }}
            aria-label="How to play and Help"
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer"
            title="Help & Guide"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
