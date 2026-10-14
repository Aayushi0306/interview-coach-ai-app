import React, { useState } from 'react';
import {
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
  Bot,
  Info,
  TrendingUp,
} from 'lucide-react';
import { AnswerEvaluation } from '../types/interview';

interface FeedbackCardProps {
  evaluation: AnswerEvaluation;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
  questionNumber: number;
  totalQuestions: number;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({
  evaluation,
  onNextQuestion,
  isLastQuestion,
  questionNumber,
  totalQuestions,
}) => {
  const [copied, setCopied] = useState(false);

  const copySampleAnswer = () => {
    navigator.clipboard.writeText(evaluation.improvedSampleAnswer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return {
      bg: 'bg-emerald-50',
      border: 'border-emerald-300',
      badge: 'bg-emerald-600 text-white',
      text: 'text-emerald-700',
      title: 'Strong Response!',
      accent: 'border-l-emerald-500',
    };
    if (score >= 6) return {
      bg: 'bg-blue-50',
      border: 'border-blue-300',
      badge: 'bg-blue-600 text-white',
      text: 'text-blue-700',
      title: 'Solid Answer with Room for Growth',
      accent: 'border-l-blue-500',
    };
    if (score >= 4) return {
      bg: 'bg-amber-50',
      border: 'border-amber-300',
      badge: 'bg-amber-600 text-white',
      text: 'text-amber-700',
      title: 'Developing Answer — Key Areas Missing',
      accent: 'border-l-amber-500',
    };
    return {
      bg: 'bg-rose-50',
      border: 'border-rose-300',
      badge: 'bg-rose-600 text-white',
      text: 'text-rose-700',
      title: 'Needs Revision & Technical Grounding',
      accent: 'border-l-rose-500',
    };
  };

  const style = getScoreColor(evaluation.score);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in-50 duration-300">
      {/* Header Evaluation Banner */}
      <div className={`p-5 sm:p-6 border-b border-slate-200 ${style.bg} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center justify-center bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm shrink-0">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-500">Score</span>
            <div className="flex items-baseline gap-1">
              <span className={`text-2xl sm:text-3xl font-extrabold ${style.text}`}>
                {evaluation.score}
              </span>
              <span className="text-slate-400 font-semibold text-sm">/10</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${style.badge}`}>
                {evaluation.score >= 8 ? 'Exceptional' : evaluation.score >= 6 ? 'Competent' : evaluation.score >= 4 ? 'Developing' : 'Needs Practice'}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Question {questionNumber} of {totalQuestions} evaluated
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
              {style.title}
            </h3>
            {evaluation.coachCommentary && (
              <p className="text-xs sm:text-sm text-slate-600 italic mt-0.5">
                "{evaluation.coachCommentary}"
              </p>
            )}
          </div>
        </div>

        {/* Next Question CTA in header for fast review */}
        <button
          onClick={onNextQuestion}
          className="self-end sm:self-center px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-md shadow-blue-700/20 flex items-center gap-2 text-sm transition-all transform active:scale-95 shrink-0 cursor-pointer"
        >
          <span>{isLastQuestion ? 'View Results Dashboard' : 'Next Question'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5 sm:p-8 space-y-6">
        {/* Grid for What Was Correct & What Was Missing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 1. What was correct */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 sm:p-5 flex flex-col">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                What Was Correct
              </h4>
            </div>
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
              {evaluation.whatWasCorrect.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* 2. What was missing or incorrect */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4 sm:p-5 flex flex-col">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <AlertCircle className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                What Was Missing or Incorrect
              </h4>
            </div>
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
              {evaluation.whatWasMissingOrIncorrect.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Improved Sample Answer */}
        <div className="rounded-xl border border-blue-200 bg-slate-900 text-white p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600/40 text-blue-300 flex items-center justify-center shrink-0 border border-blue-500/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm sm:text-base">
                  Improved Sample Answer
                </h4>
                <p className="text-[11px] text-slate-400">
                  Ideal model response structure to memorize and learn from
                </p>
              </div>
            </div>
            <button
              onClick={copySampleAnswer}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-colors"
              title="Copy sample answer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <div className="font-mono text-xs sm:text-sm bg-slate-950/70 p-4 rounded-lg text-slate-200 whitespace-pre-wrap border border-slate-800 leading-relaxed overflow-x-auto">
            {evaluation.improvedSampleAnswer}
          </div>
        </div>

        {/* 4. One Practical Improvement Tip */}
        <div className="rounded-xl border border-sky-200 bg-sky-50/70 p-4 sm:p-5 flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sky-950 text-sm sm:text-base">
                Coach Alex's Placement Tip
              </h4>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-sky-200/80 text-sky-900 px-2 py-0.5 rounded-full">
                Actionable
              </span>
            </div>
            <p className="text-xs sm:text-sm text-sky-900 mt-1 leading-relaxed font-medium">
              {evaluation.improvementTip}
            </p>
          </div>
        </div>

        {/* AI Disclosure Note */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>
              Feedback generated by Gemini AI for interview preparation purposes. Always verify technical edge cases.
            </span>
          </div>

          {/* Big Next Question Button */}
          <button
            onClick={onNextQuestion}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-bold rounded-xl shadow-lg shadow-blue-700/25 flex items-center justify-center gap-2 transition-all transform active:scale-95 text-sm cursor-pointer"
          >
            <span>{isLastQuestion ? 'Complete Session & View Report' : 'Next Question'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
