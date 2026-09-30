import React, { useState } from 'react';
import { GameView, PlayerStats } from '../types/game';
import { AVATAR_OPTIONS } from '../data/rewardsData';
import { sounds, speakText } from '../utils/soundEffects';
import { DEFAULT_STATS, savePlayerStats } from '../utils/storage';
import { ArrowLeft, Volume2, Mic, Music, User, Trash2, CheckCircle2 } from 'lucide-react';

interface SettingsModalProps {
  stats: PlayerStats;
  onUpdateStats: (newStats: Partial<PlayerStats>) => void;
  onNavigate: (view: GameView) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  stats,
  onUpdateStats,
  onNavigate
}) => {
  const [playerNameInput, setPlayerNameInput] = useState(stats.playerName);
  const [confirmReset, setConfirmReset] = useState(false);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerNameInput.trim()) {
      sounds.playClick(stats.soundEnabled);
      onUpdateStats({ playerName: playerNameInput.trim() });
    }
  };

  const handleAvatarSelect = (avatarId: string) => {
    sounds.playClick(stats.soundEnabled);
    onUpdateStats({ avatar: avatarId });
  };

  const handleToggleSound = () => {
    const next = !stats.soundEnabled;
    onUpdateStats({ soundEnabled: next });
    if (next) sounds.playClick(true);
  };

  const handleToggleMusic = () => {
    const next = !stats.musicEnabled;
    onUpdateStats({ musicEnabled: next });
    if (next) {
      sounds.startBgm(true);
    } else {
      sounds.stopBgm();
    }
  };

  const handleToggleVoice = () => {
    const next = !stats.voiceReadAloud;
    onUpdateStats({ voiceReadAloud: next });
    if (next) {
      speakText('Voice read-aloud is ready!', true, stats.voiceSpeed);
    }
  };

  const handleSpeedChange = (speed: number) => {
    sounds.playClick(stats.soundEnabled);
    onUpdateStats({ voiceSpeed: speed });
    if (stats.voiceReadAloud) {
      speakText(`Voice speed set to ${speed === 0.8 ? 'Slow' : speed === 1.0 ? 'Normal' : 'Fast'}`, true, speed);
    }
  };

  const handleResetAll = () => {
    savePlayerStats(DEFAULT_STATS);
    onUpdateStats(DEFAULT_STATS);
    setConfirmReset(false);
    sounds.playClick(true);
  };

  return (
    <div className="space-y-6 pb-12 max-w-2xl mx-auto">
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

        <h2 className="text-xl font-black text-slate-800">Game Settings ⚙️</h2>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm space-y-7">
        {/* Kid Player Profile & Name */}
        <section className="space-y-3">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <User className="w-4 h-4 text-amber-500" />
            <span>Choose Your Kid Avatar</span>
          </h3>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
            {AVATAR_OPTIONS.map((av) => {
              const isSelected = stats.avatar === av.id;
              return (
                <button
                  key={av.id}
                  onClick={() => handleAvatarSelect(av.id)}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-1 border-3 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-100 border-amber-400 scale-105 shadow-xs'
                      : 'bg-slate-50 border-slate-200 hover:border-amber-300'
                  }`}
                  title={`${av.name} (${av.role})`}
                >
                  <span className="text-2xl sm:text-3xl">{av.emoji}</span>
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSaveName} className="flex gap-2 pt-2">
            <input
              type="text"
              value={playerNameInput}
              onChange={(e) => setPlayerNameInput(e.target.value)}
              placeholder="Your Name / Nickname"
              maxLength={15}
              className="flex-1 px-4 py-2.5 rounded-xl border-2 border-slate-200 focus:border-amber-400 focus:outline-none font-bold text-slate-800 text-sm"
            />
            <button
              type="submit"
              className="btn-3d btn-3d-amber bg-amber-400 text-amber-950 font-black px-4 py-2.5 rounded-xl text-sm cursor-pointer"
            >
              Save
            </button>
          </form>
        </section>

        {/* Audio & Voice Settings */}
        <section className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-emerald-500" />
            <span>Sound & Voice Controls</span>
          </h3>

          {/* Sound FX Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <div className="font-black text-sm text-slate-800">Game Sound Effects</div>
              <div className="text-xs text-slate-500">Chimes, button clicks, and celebrations</div>
            </div>
            <button
              onClick={handleToggleSound}
              className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer ${
                stats.soundEnabled ? 'bg-emerald-500' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  stats.soundEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Background Music Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <div className="font-black text-sm text-slate-800">Gentle Background Music</div>
              <div className="text-xs text-slate-500">Soft relaxing melodic chimes</div>
            </div>
            <button
              onClick={handleToggleMusic}
              className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer ${
                stats.musicEnabled ? 'bg-indigo-500' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  stats.musicEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Voice Read Aloud Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <div className="font-black text-sm text-slate-800">Voice Read-Aloud</div>
              <div className="text-xs text-slate-500">Reads questions aloud for early readers</div>
            </div>
            <button
              onClick={handleToggleVoice}
              className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer ${
                stats.voiceReadAloud ? 'bg-amber-500' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  stats.voiceReadAloud ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Reading Speed */}
          {stats.voiceReadAloud && (
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
              <div className="text-xs font-black text-amber-900">Voice Reading Speed:</div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { speed: 0.8, label: 'Slow (Kid)' },
                  { speed: 0.95, label: 'Normal' },
                  { speed: 1.15, label: 'Fast' }
                ].map((s) => (
                  <button
                    key={s.speed}
                    onClick={() => handleSpeedChange(s.speed)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      stats.voiceSpeed === s.speed
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-amber-100'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Reset Progress Section */}
        <section className="pt-4 border-t border-slate-100">
          {!confirmReset ? (
            <button
              onClick={() => setConfirmReset(true)}
              className="text-xs font-bold text-rose-500 hover:text-rose-700 flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset Game Progress & Stars</span>
            </button>
          ) : (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl space-y-2 text-left">
              <div className="text-xs font-bold text-rose-900">
                Are you sure you want to reset all stars, high scores, and stickers?
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleResetAll}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  Yes, Reset Everything
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
