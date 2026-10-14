import React from 'react';
import { GraduationCap, Sparkles, HelpCircle, RefreshCw, Layers, Download } from 'lucide-react';
import { Topic, Difficulty } from '../types/interview';

interface NavbarProps {
  currentStep: 'welcome' | 'interview' | 'results';
  topic?: Topic;
  difficulty?: Difficulty;
  questionNumber?: number;
  totalQuestions?: number;
  onOpenDeployModal: () => void;
  onRestart?: () => void;
  hasGeminiKey?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStep,
  topic,
  difficulty,
  questionNumber,
  totalQuestions,
  onOpenDeployModal,
  onRestart,
  hasGeminiKey = true,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/20 text-white">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                AI Interview Prep Buddy
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                <Sparkles className="w-3 h-3 text-blue-400" />
                Gemini 3.8
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Placement Coach for College Students & Freshers
            </p>
          </div>
        </div>

        {/* Center: Live Session Indicator */}
        {currentStep === 'interview' && topic && (
          <div className="hidden md:flex items-center gap-2 bg-slate-800/90 border border-slate-700/80 px-3.5 py-1.5 rounded-full text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-slate-200">{topic}</span>
            <span className="text-slate-500">•</span>
            <span className="text-blue-300 font-medium">{difficulty}</span>
            {questionNumber && totalQuestions && (
              <>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300 font-semibold">
                  Q {questionNumber} / {totalQuestions}
                </span>
              </>
            )}
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {currentStep !== 'welcome' && onRestart && (
            <button
              onClick={onRestart}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
              title="Change topic or start over"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Change Topic</span>
            </button>
          )}

          <a
            href="/api/download-zip"
            download="ai-interview-prep-buddy.zip"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-200 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-700/60 rounded-lg transition-colors"
            title="Download complete project ZIP file"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Download ZIP</span>
          </a>

          <button
            onClick={onOpenDeployModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-200 bg-blue-900/40 hover:bg-blue-800/50 border border-blue-700/60 rounded-lg transition-colors"
            title="Deploy to Vercel and API Key Setup"
          >
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>Vercel Deploy</span>
          </button>

          {!hasGeminiKey && (
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-medium"
              title="Offline fallback mode active. Connect Gemini API key for dynamic generation."
            >
              <HelpCircle className="w-3 h-3 text-amber-400" />
              Offline Mode
            </span>
          )}
        </div>
      </div>
    </header>
  );
};
