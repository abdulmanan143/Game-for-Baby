/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CategoryId, Difficulty, GameView, PlayerStats } from './types/game';
import { loadPlayerStats, savePlayerStats, recordGameResults } from './utils/storage';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { CategorySelector } from './components/CategorySelector';
import { MathGame } from './components/MathGame';
import { VocabGame } from './components/VocabGame';
import { GKGame } from './components/GKGame';
import { MemoryGame } from './components/MemoryGame';
import { LogicGame } from './components/LogicGame';
import { TypingGame } from './components/TypingGame';
import { GameOverModal } from './components/GameOverModal';
import { RewardGallery } from './components/RewardGallery';
import { Scoreboard } from './components/Scoreboard';
import { SettingsModal } from './components/SettingsModal';
import { HelpModal } from './components/HelpModal';
import { sounds } from './utils/soundEffects';

export default function App() {
  const [stats, setStats] = useState<PlayerStats>(() => loadPlayerStats());
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [currentView, setCurrentView] = useState<GameView>('home');
  const [activeCategory, setActiveCategory] = useState<CategoryId>('math');

  // Victory / Game completion modal
  const [gameOverModalData, setGameOverModalData] = useState<{
    category: CategoryId;
    difficulty: Difficulty;
    starsEarned: number;
    score: number;
    newStickers: string[];
  } | null>(null);

  // Manage background music when setting changes
  useEffect(() => {
    if (stats.musicEnabled) {
      sounds.startBgm(true);
    } else {
      sounds.stopBgm();
    }
    return () => {
      sounds.stopBgm();
    };
  }, [stats.musicEnabled]);

  const handleUpdateStats = (newPartial: Partial<PlayerStats>) => {
    setStats((prev) => {
      const updated = { ...prev, ...newPartial };
      savePlayerStats(updated);
      return updated;
    });
  };

  const handleSelectCategory = (catId: CategoryId) => {
    setActiveCategory(catId);
    if (catId === 'math') setCurrentView('play_math');
    else if (catId === 'vocab') setCurrentView('play_vocab');
    else if (catId === 'gk') setCurrentView('play_gk');
    else if (catId === 'memory') setCurrentView('play_memory');
    else if (catId === 'logic') setCurrentView('play_logic');
    else if (catId === 'typing') setCurrentView('play_typing');
  };

  const handleFinishGame = (stars: number, scoreEarned: number) => {
    const { updatedStats, newStickersUnlocked } = recordGameResults(
      stats,
      activeCategory,
      difficulty,
      stars,
      scoreEarned
    );
    setStats(updatedStats);

    setGameOverModalData({
      category: activeCategory,
      difficulty,
      starsEarned: stars,
      score: scoreEarned,
      newStickers: newStickersUnlocked
    });
  };

  const handlePlayAgain = () => {
    setGameOverModalData(null);
    // Reload active game
    handleSelectCategory(activeCategory);
  };

  const handleNavigate = (view: GameView) => {
    setGameOverModalData(null);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-slate-800">
      {/* Universal Top Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        stats={stats}
        onUpdateStats={handleUpdateStats}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {currentView === 'home' && (
          <HomeScreen
            difficulty={difficulty}
            onSelectDifficulty={setDifficulty}
            onSelectCategory={handleSelectCategory}
            onNavigate={handleNavigate}
            stats={stats}
          />
        )}

        {currentView === 'categories' && (
          <CategorySelector
            difficulty={difficulty}
            onSelectDifficulty={setDifficulty}
            onSelectCategory={handleSelectCategory}
            onNavigate={handleNavigate}
            stats={stats}
          />
        )}

        {currentView === 'play_math' && (
          <MathGame
            difficulty={difficulty}
            stats={stats}
            onFinishGame={handleFinishGame}
            onBackToMenu={() => handleNavigate('home')}
          />
        )}

        {currentView === 'play_vocab' && (
          <VocabGame
            difficulty={difficulty}
            stats={stats}
            onFinishGame={handleFinishGame}
            onBackToMenu={() => handleNavigate('home')}
          />
        )}

        {currentView === 'play_gk' && (
          <GKGame
            difficulty={difficulty}
            stats={stats}
            onFinishGame={handleFinishGame}
            onBackToMenu={() => handleNavigate('home')}
          />
        )}

        {currentView === 'play_memory' && (
          <MemoryGame
            difficulty={difficulty}
            stats={stats}
            onFinishGame={handleFinishGame}
            onBackToMenu={() => handleNavigate('home')}
          />
        )}

        {currentView === 'play_logic' && (
          <LogicGame
            difficulty={difficulty}
            stats={stats}
            onFinishGame={handleFinishGame}
            onBackToMenu={() => handleNavigate('home')}
          />
        )}

        {currentView === 'play_typing' && (
          <TypingGame
            difficulty={difficulty}
            stats={stats}
            onFinishGame={handleFinishGame}
            onBackToMenu={() => handleNavigate('home')}
          />
        )}

        {currentView === 'rewards' && (
          <RewardGallery stats={stats} onNavigate={handleNavigate} />
        )}

        {currentView === 'scores' && (
          <Scoreboard stats={stats} onNavigate={handleNavigate} />
        )}

        {currentView === 'settings' && (
          <SettingsModal
            stats={stats}
            onUpdateStats={handleUpdateStats}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'help' && (
          <HelpModal stats={stats} onNavigate={handleNavigate} />
        )}
      </main>

      {/* Victory / Game Over Modal */}
      {gameOverModalData && (
        <GameOverModal
          category={gameOverModalData.category}
          difficulty={gameOverModalData.difficulty}
          starsEarned={gameOverModalData.starsEarned}
          score={gameOverModalData.score}
          newStickers={gameOverModalData.newStickers}
          soundEnabled={stats.soundEnabled}
          voiceReadAloud={stats.voiceReadAloud}
          voiceSpeed={stats.voiceSpeed}
          onPlayAgain={handlePlayAgain}
          onNavigate={handleNavigate}
        />
      )}

      {/* Child-Friendly Footer */}
      <footer className="mt-auto border-t-2 border-amber-200 bg-white/80 py-4 px-4 text-center text-xs text-slate-500 font-bold">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span>⭐ Smart Kids Learning Game</span>
            <span aria-hidden="true">·</span>
            <span>Ages 5–12</span>
            <span aria-hidden="true">·</span>
            <span>Safe & Ad-Free</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavigate('help')}
              className="text-amber-600 hover:text-amber-800 transition-colors cursor-pointer"
            >
              How to Play
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => handleNavigate('settings')}
              className="text-amber-600 hover:text-amber-800 transition-colors cursor-pointer"
            >
              Settings
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => handleNavigate('rewards')}
              className="text-amber-600 hover:text-amber-800 transition-colors cursor-pointer"
            >
              Sticker Album
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
