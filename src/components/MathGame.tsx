import React, { useState, useEffect } from 'react';
import { Difficulty, PlayerStats, QuizQuestion } from '../types/game';
import { MATH_QUESTIONS } from '../data/gameContent';
import { sounds, speakText } from '../utils/soundEffects';
import { Volume2, ArrowRight, ArrowLeft, CheckCircle2, XCircle, Sparkles, RefreshCw, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MathGameProps {
  difficulty: Difficulty;
  stats: PlayerStats;
  onFinishGame: (stars: number, score: number) => void;
  onBackToMenu: () => void;
}

export const MathGame: React.FC<MathGameProps> = ({
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

  // Shuffle questions on start
  useEffect(() => {
    const list = [...(MATH_QUESTIONS[difficulty] || MATH_QUESTIONS.easy)];
    // Randomize order
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

  // Auto read aloud if enabled
  useEffect(() => {
    if (currentQ && stats.voiceReadAloud) {
      speakText(currentQ.question, true, stats.voiceSpeed);
    }
  }, [currentIndex, currentQ, stats.voiceReadAloud, stats.voiceSpeed]);

  if (!currentQ) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border-2 border-slate-200">
        <p className="font-bold text-slate-600">Loading Math Magic questions...</p>
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
      setScore((prev) => prev + 10);
      setCorrectCount((prev) => prev + 1);
      // Small celebratory burst
      try {
        confetti({
          particleCount: 25,
          spread: 50,
          origin: { y: 0.6 }
        });
      } catch {}

      if (stats.voiceReadAloud) {
        speakText('Awesome! That is correct!', true, stats.voiceSpeed);
      }
    } else {
      sounds.playWrong(stats.soundEnabled);
      if (stats.voiceReadAloud) {
        speakText('Nice try! Look at the correct answer.', true, stats.voiceSpeed);
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
      // Completed all questions!
      const totalStars = correctCount >= questions.length - 1 ? 3 : correctCount >= Math.floor(questions.length / 2) ? 2 : 1;
      onFinishGame(totalStars, score + (isAnswered && selectedOption === currentQ.correctIndex ? 10 : 0));
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top HUD */}
      <div className="bg-white rounded-2xl p-4 border-2 border-emerald-200 shadow-sm flex items-center justify-between gap-3">
        <button
          onClick={onBackToMenu}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Game</span>
        </button>

        {/* Progress Dots */}
        <div className="flex items-center gap-1 sm:gap-2">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-2.5 rounded-full transition-all ${
                i === currentIndex
                  ? 'w-7 bg-emerald-500'
                  : i < currentIndex
                  ? 'w-2.5 bg-emerald-300'
                  : 'w-2.5 bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Score & Stars */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200 text-xs font-black text-amber-900">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>{score} pts</span>
          </div>
          <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md uppercase">
            {difficulty}
          </span>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-emerald-300 shadow-lg space-y-6 text-center">
        {/* Category Badge & Read Aloud Speaker */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
            <span>➕ Math Magic</span>
            <span>·</span>
            <span>Q{currentIndex + 1} of {questions.length}</span>
          </div>

          <button
            onClick={handleReadQuestion}
            className="flex items-center gap-1.5 text-xs font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 px-3 py-1.5 rounded-xl cursor-pointer transition-all active:scale-95"
            title="Read question out loud"
          >
            <Volume2 className="w-4 h-4 text-amber-700 animate-pulse-gentle" />
            <span>Read Aloud</span>
          </button>
        </div>

        {/* Question Text */}
        <div className="space-y-2 py-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-snug">
            {currentQ.question}
          </h2>
          {currentQ.hint && !isAnswered && (
            <p className="text-xs sm:text-sm font-semibold text-slate-400 italic">
              💡 Clue: {currentQ.hint}
            </p>
          )}
        </div>

        {/* Visual Element for Counting Questions */}
        {currentQ.type === 'count' && currentQ.visualData?.fruitCount && (
          <div className="bg-emerald-50/70 rounded-2xl p-6 border-2 border-emerald-200 flex flex-wrap items-center justify-center gap-3 sm:gap-4 my-4 animate-float">
            {Array.from({ length: currentQ.visualData.fruitCount }).map((_, i) => (
              <span
                key={i}
                className="text-4xl sm:text-5xl transform hover:scale-125 transition-transform cursor-pointer drop-shadow-sm"
                onClick={() => sounds.playPop(stats.soundEnabled)}
              >
                {currentQ.visualData?.fruitEmoji || '🍎'}
              </span>
            ))}
          </div>
        )}

        {/* Visual Element for Sequence Questions */}
        {currentQ.type === 'sequence' && currentQ.visualData?.sequence && (
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap my-4">
            {currentQ.visualData.sequence.map((item, i) => (
              <div
                key={i}
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-black shadow-md border-3 ${
                  item === '?'
                    ? 'bg-amber-300 text-amber-950 border-amber-400 animate-pulse-gentle ring-4 ring-amber-100'
                    : 'bg-emerald-50 text-emerald-950 border-emerald-300'
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        )}

        {/* Options Grid */}
        <div
          className={`grid gap-3.5 sm:gap-4 ${
            currentQ.options.length === 2 ? 'grid-cols-2 max-w-md mx-auto' : 'grid-cols-2 sm:grid-cols-4'
          }`}
        >
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;

            let btnStyle = 'bg-slate-50 border-slate-300 text-slate-800 hover:bg-emerald-50 hover:border-emerald-400';

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
                className={`btn-3d py-4 sm:py-5 px-4 rounded-2xl border-3 font-black text-xl sm:text-2xl md:text-3xl transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${btnStyle}`}
              >
                <span>{opt}</span>
                {isAnswered && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-white animate-bounce" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-600" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback & Explanation Box */}
        {showExplanation && (
          <div
            className={`p-4 rounded-2xl border-2 text-left space-y-1 transition-all animate-fadeIn ${
              selectedOption === currentQ.correctIndex
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <div className="flex items-center gap-2 font-black text-sm sm:text-base">
              {selectedOption === currentQ.correctIndex ? (
                <>
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  <span>Fantastic Job! You got it right! ⭐</span>
                </>
              ) : (
                <>
                  <span>💡</span>
                  <span>Good Effort! Here is the answer:</span>
                </>
              )}
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-700">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Next Question CTA */}
        {isAnswered && (
          <div className="pt-2">
            <button
              onClick={handleNextQuestion}
              className="btn-3d btn-3d-emerald bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg sm:text-xl px-8 py-3.5 rounded-2xl flex items-center gap-2 mx-auto cursor-pointer shadow-lg transform hover:scale-105"
            >
              <span>{currentIndex + 1 < questions.length ? 'Next Question' : 'See My Results!'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
