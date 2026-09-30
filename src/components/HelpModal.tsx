import React from 'react';
import { GameView, PlayerStats } from '../types/game';
import { sounds } from '../utils/soundEffects';
import { ArrowLeft, BookOpen, Heart, Sparkles, Smile, ShieldCheck, Check } from 'lucide-react';

interface HelpModalProps {
  stats: PlayerStats;
  onNavigate: (view: GameView) => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ stats, onNavigate }) => {
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

        <h2 className="text-xl font-black text-slate-800">How to Play & About 💡</h2>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm space-y-6">
        {/* Welcome */}
        <div className="space-y-2 text-center pb-4 border-b border-slate-100">
          <div className="text-4xl">🌟</div>
          <h3 className="text-2xl font-black text-slate-900">
            Welcome to Smart Kids Learning Game!
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            A vibrant, playful playground where learning feels like an adventure, not like a boring school test!
          </p>
        </div>

        {/* Categories Explained */}
        <div className="space-y-3">
          <h4 className="text-sm font-black uppercase text-amber-700 tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Game Modes & How to Play</span>
          </h4>

          <div className="space-y-2.5 text-xs sm:text-sm text-slate-700">
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
              <span className="font-black text-emerald-900">➕ Math Magic: </span>
              Solve fun arithmetic, fruit counting (🍎), compare numbers (which is greater), and sequence puzzles.
            </div>

            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
              <span className="font-black text-amber-900">📚 Word Quest: </span>
              Fill in missing letters, spot opposite words, discover rhyming pairs, and expand vocabulary.
            </div>

            <div className="p-3 bg-cyan-50 rounded-2xl border border-cyan-200">
              <span className="font-black text-cyan-900">🌍 World Explorer: </span>
              Fascinating trivia about animals, planets in our solar system, geography, and nature wonders.
            </div>

            <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200">
              <span className="font-black text-purple-900">🃏 Memory Match: </span>
              Tap to flip cards and match animal pairs, space gadgets, or fruits. Boosts focus and recall!
            </div>

            <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200">
              <span className="font-black text-rose-900">🧩 Brain Teasers: </span>
              Complete shape/color sequences, spot the odd one out, and crack witty child-friendly riddles.
            </div>

            <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-200">
              <span className="font-black text-indigo-900">⌨️ Key Pop Quest: </span>
              Pop floating alphabet balloons by pressing keys on your keyboard or the on-screen keypad!
            </div>
          </div>
        </div>

        {/* Parent & Teacher Notes */}
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
          <h4 className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>For Parents & Teachers</span>
          </h4>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
            <li><strong>Voice Read-Aloud:</strong> Great for younger children who are still learning to read independently. They can click the "Read Aloud" button or keep auto-reading turned on in Settings.</li>
            <li><strong>Zero Stress:</strong> No harsh penalties or countdown timers that cause anxiety. Feedback is positive, encouraging resilience.</li>
            <li><strong>Stars & Rewards:</strong> Players collect stars that unlock badges and stickers in their personal album.</li>
            <li><strong>Difficulty Switching:</strong> Easily shift between Easy (5–7), Medium (8–9), and Hard (10–12) at any time.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
