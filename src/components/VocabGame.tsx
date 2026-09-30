import React, { useState, useEffect } from 'react';
import { Difficulty, PlayerStats, QuizQuestion } from '../types/game';
import { VOCAB_QUESTIONS } from '../data/gameContent';
import { sounds, speakText } from '../utils/soundEffects';
import { Volume2, ArrowRight, ArrowLeft, CheckCircle2, XCircle, Sparkles, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

interface VocabGameProps {
  difficulty: Difficulty;
  stats: PlayerStats;
  onFinishGame: (stars: number, score: number) => void;
  onBackToMenu: () => void;
}

export const VocabGame: React.FC<VocabGameProps> = ({
  difficulty,
  stats,
  onFinishGame,
  onBackToMenu
}) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    const list = [...(VOCAB_QUESTIONS[difficulty] || VOCAB_QUESTIONS.easy)];
    const shuffled = list.sort(() => 0.5 - Math.random());
    setQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setCorrectCount(0);
    setShowExplanation(false);
  }, [difficulty]);

  const currentQ = questions[currentIndex];

  useEffect(() => {
    if (currentQ && stats.voiceReadAloud) {
      speakText(currentQ.question, true, stats.voiceSpeed);
    }
  }, [currentIndex, currentQ, stats.voiceReadAloud, stats.voiceSpeed]);

  if (!currentQ) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border-2 border-slate-200">
        <p className="font-bold text-slate-600">Loading Word Quest...</p>
      </div>
    );
  }

  const handleReadQuestion = () => {
    sounds.playClick(stats.soundEnabled);
    speakText(currentQ.question, true, stats.voiceSpeed);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    setShowExplanation(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      sounds.playCorrect(stats.soundEnabled);
      setScore((s) => s + 10);
      setCorrectCount((c) => c + 1);
      try {
        confetti({ particleCount: 25, spread: 50, origin: { y: 0.6 } });
      } catch {}
      if (stats.voiceReadAloud) {
        speakText('Super! Great word skills!', true, stats.voiceSpeed);
      }
    } else {
      sounds.playWrong(stats.soundEnabled);
      if (stats.voiceReadAloud) {
        speakText('Good try! Let us learn the right word.', true, stats.voiceSpeed);
      }
    }
  };

  const handleNextQuestion = () => {
    sounds.playClick(stats.soundEnabled);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowExplanation(false);
    } else {
      const totalStars = correctCount >= questions.length - 1 ? 3 : correctCount >= Math.floor(questions.length / 2) ? 2 : 1;
      onFinishGame(totalStars, score + (isAnswered && selectedOption === currentQ.correctIndex ? 10 : 0));
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top HUD */}
      <div className="bg-white rounded-2xl p-4 border-2 border-amber-200 shadow-sm flex items-center justify-between gap-3">
        <button
          onClick={onBackToMenu}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Game</span>
        </button>

        {/* Progress Dots */}
        <div className="flex items-center gap-1.5">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-2.5 rounded-full transition-all ${
                i === currentIndex
                  ? 'w-7 bg-amber-500'
                  : i < currentIndex
                  ? 'w-2.5 bg-amber-300'
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
          <span className="text-xs font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md uppercase">
            {difficulty}
          </span>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-lg space-y-6 text-center">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
            <span>📚 Word Quest</span>
            <span>·</span>
            <span>Q{currentIndex + 1} of {questions.length}</span>
          </div>

          <button
            onClick={handleReadQuestion}
            className="flex items-center gap-1.5 text-xs font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 px-3 py-1.5 rounded-xl cursor-pointer transition-all active:scale-95"
            title="Read out loud"
          >
            <Volume2 className="w-4 h-4 text-amber-700 animate-pulse-gentle" />
            <span>Read Aloud</span>
          </button>
        </div>

        <div className="space-y-2 py-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
            {currentQ.question}
          </h2>
          {currentQ.hint && !isAnswered && (
            <p className="text-xs sm:text-sm font-semibold text-slate-400 italic">
              💡 Hint: {currentQ.hint}
            </p>
          )}
        </div>

        {/* Missing Letter Visual Tile Display */}
        {currentQ.type === 'missing_letter' && currentQ.visualData?.missingLetterWord && (
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap my-4">
            {currentQ.visualData.missingLetterWord.split('').map((letter, i) => {
              const isMissing = i === currentQ.visualData?.missingIndex;
              return (
                <div
                  key={i}
                  className={`w-12 h-14 sm:w-14 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-black shadow-md border-3 transition-all ${
                    isMissing
                      ? isAnswered
                        ? 'bg-amber-400 text-amber-950 border-amber-500 scale-105 ring-4 ring-amber-100'
                        : 'bg-amber-100 text-amber-800 border-amber-300 border-dashed animate-pulse'
                      : 'bg-slate-100 text-slate-800 border-slate-300'
                  }`}
                >
                  {isMissing ? (isAnswered ? currentQ.options[currentQ.correctIndex] : '_') : letter}
                </div>
              );
            })}
          </div>
        )}

        {/* Options Grid */}
        <div className="grid grid-cols-2 gap-3.5 sm:gap-4 max-w-lg mx-auto">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;

            let btnStyle = 'bg-slate-50 border-slate-300 text-slate-800 hover:bg-amber-50 hover:border-amber-400';

            if (isAnswered) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-500 border-emerald-600 text-white shadow-lg ring-4 ring-emerald-200 scale-105';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'bg-rose-100 border-rose-400 text-rose-800 opacity-80';
              } else {
                btnStyle = 'bg-slate-100 border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`btn-3d py-4 px-4 rounded-2xl border-3 font-black text-xl sm:text-2xl transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${btnStyle}`}
              >
                <span>{opt}</span>
                {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-white animate-bounce" />}
                {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600" />}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div
            className={`p-4 rounded-2xl border-2 text-left space-y-1 ${
              selectedOption === currentQ.correctIndex
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <div className="flex items-center gap-2 font-black text-sm sm:text-base">
              {selectedOption === currentQ.correctIndex ? (
                <>
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  <span>Word Master! That is right! ⭐</span>
                </>
              ) : (
                <>
                  <span>💡</span>
                  <span>Word Fact:</span>
                </>
              )}
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-700">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {isAnswered && (
          <div className="pt-2">
            <button
              onClick={handleNextQuestion}
              className="btn-3d btn-3d-amber bg-amber-500 hover:bg-amber-600 text-white font-black text-lg sm:text-xl px-8 py-3.5 rounded-2xl flex items-center gap-2 mx-auto cursor-pointer shadow-lg transform hover:scale-105"
            >
              <span>{currentIndex + 1 < questions.length ? 'Next Word' : 'See Results!'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
