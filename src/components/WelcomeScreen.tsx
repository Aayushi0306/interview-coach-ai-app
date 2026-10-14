import React, { useState } from 'react';
import {
  UserCheck,
  Database,
  Code,
  Table,
  BarChart3,
  BrainCircuit,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  BookOpen,
  Target,
  Award,
} from 'lucide-react';
import { Topic, Difficulty, PracticeLength, PracticeConfig } from '../types/interview';
import { TOPIC_DETAILS } from '../data/questionBank';

interface WelcomeScreenProps {
  onStartPractice: (config: PracticeConfig) => void;
  hasGeminiKey: boolean;
  onOpenDeployModal: () => void;
}

const TOPIC_ICONS: Record<Topic, React.ReactNode> = {
  'HR Interview': <UserCheck className="w-6 h-6 text-blue-600" />,
  'SQL': <Database className="w-6 h-6 text-indigo-600" />,
  'Python': <Code className="w-6 h-6 text-sky-600" />,
  'Excel': <Table className="w-6 h-6 text-emerald-600" />,
  'Power BI': <BarChart3 className="w-6 h-6 text-amber-600" />,
  'Aptitude': <BrainCircuit className="w-6 h-6 text-purple-600" />,
};

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStartPractice,
  hasGeminiKey,
  onOpenDeployModal,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<Topic>('HR Interview');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('Beginner');
  const [selectedLength, setSelectedLength] = useState<PracticeLength>(5);
  const [studentName, setStudentName] = useState<string>('');
  const [targetRole, setTargetRole] = useState<string>('');

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    onStartPractice({
      topic: selectedTopic,
      difficulty: selectedDifficulty,
      length: selectedLength,
      studentName: studentName.trim() || undefined,
      targetRole: targetRole.trim() || undefined,
    });
  };

  const topicsList: Topic[] = ['HR Interview', 'SQL', 'Python', 'Excel', 'Power BI', 'Aptitude'];
  const difficulties: { level: Difficulty; subtitle: string; description: string }[] = [
    {
      level: 'Beginner',
      subtitle: 'Campus Entry & Freshers',
      description: 'Foundational concepts, direct definitions, basic syntax, and standard HR questions.',
    },
    {
      level: 'Intermediate',
      subtitle: 'Placement Drives & Core Rounds',
      description: 'Scenario-based problems, multi-condition queries, STAR behavioral stories, and optimizations.',
    },
    {
      level: 'Advanced',
      subtitle: 'Senior Rounds & High Packages',
      description: 'Complex edge cases, recursive logic, architectural trade-offs, and critical thinking puzzles.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-blue-900/50">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-medium mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-blue-400 animate-spin-slow" />
            <span>AI-Powered Placement Interview Coach for College Students</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Prepare, Practise & <span className="bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent">Crack Your Dream Job</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Experience real placement interview rounds with your personalized Gemini AI coach.
            Receive instant scores out of 10, pinpoint what you got right, discover what was missing,
            and study improved sample answers.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
              <div className="text-blue-400 font-bold text-lg sm:text-xl">6 Topics</div>
              <div className="text-xs text-slate-300">Tech, Data, HR & Quant</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
              <div className="text-emerald-400 font-bold text-lg sm:text-xl">Score / 10</div>
              <div className="text-xs text-slate-300">Instant AI Grading</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
              <div className="text-amber-400 font-bold text-lg sm:text-xl">Model Answers</div>
              <div className="text-xs text-slate-300">Curated Placement Samples</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
              <div className="text-sky-400 font-bold text-lg sm:text-xl">100% Free</div>
              <div className="text-xs text-slate-300">Safe, Private & Zero Slop</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Configuration Card */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <form onSubmit={handleStart} className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 sm:p-8 space-y-8">
          {/* Step 1: Topic Selection */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold">1</span>
                  Select Interview Topic
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Choose the domain for your mock interview practice session.
                </p>
              </div>
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                {selectedTopic}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {topicsList.map((topic) => {
                const details = TOPIC_DETAILS[topic];
                const isSelected = selectedTopic === topic;
                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => setSelectedTopic(topic)}
                    className={`text-left p-4 rounded-xl border-2 transition-all relative flex flex-col justify-between group cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-blue-300 bg-white hover:bg-slate-50/80'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-100' : 'bg-slate-100 group-hover:bg-blue-50'}`}>
                          {TOPIC_ICONS[topic]}
                        </div>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {details.badge}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-base">{topic}</h3>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                        {details.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Target: {details.popularRoles[0]}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Difficulty Selection */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold">2</span>
                  Select Difficulty Level
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Matched to your college year, internship experience, or target company tier.
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
                {selectedDifficulty} Level
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {difficulties.map((diff) => {
                const isSelected = selectedDifficulty === diff.level;
                return (
                  <button
                    key={diff.level}
                    type="button"
                    onClick={() => setSelectedDifficulty(diff.level)}
                    className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 shadow-sm ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-blue-300 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-slate-900 text-base">{diff.level}</span>
                      {isSelected ? (
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-300" />
                      )}
                    </div>
                    <div className="text-xs font-semibold text-blue-700 mb-1">{diff.subtitle}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">{diff.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Practice Length */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold">3</span>
                  Practice Session Length
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  How many questions would you like to attempt today?
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setSelectedLength(5)}
                className={`p-4 rounded-xl border-2 text-left flex items-start gap-3 transition-all cursor-pointer ${
                  selectedLength === 5
                    ? 'border-blue-600 bg-blue-50/60 shadow-sm ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-blue-300 bg-white'
                }`}
              >
                <div className={`p-2.5 rounded-lg ${selectedLength === 5 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-base">5 Questions</span>
                    <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      Quick Sprint (~10 mins)
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Perfect for a focused daily review before college lectures or campus rounds.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedLength(10)}
                className={`p-4 rounded-xl border-2 text-left flex items-start gap-3 transition-all cursor-pointer ${
                  selectedLength === 10
                    ? 'border-blue-600 bg-blue-50/60 shadow-sm ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-blue-300 bg-white'
                }`}
              >
                <div className={`p-2.5 rounded-lg ${selectedLength === 10 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-base">10 Questions</span>
                    <span className="text-[11px] font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                      Full Mock Round (~25 mins)
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Simulates an actual placement technical or behavioral interview round with deep scoring.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Optional Profile Personalization */}
          <div className="pt-4 border-t border-slate-100 bg-slate-50/80 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 sm:p-8 rounded-b-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="student-name" className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Name (Optional)
                </label>
                <input
                  id="student-name"
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Priyanshu, Ananya, Alex"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="target-role" className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Role / Company (Optional)
                </label>
                <input
                  id="target-role"
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Data Analyst, TCS Digital, SDE 1"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Launch Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Supportive interview coach • Rigorous 5-point evaluation • AI Disclosure active
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2.5 transition-all transform active:scale-[0.98] cursor-pointer text-base"
              >
                <span>Start Practice</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </form>

        {/* Feature Cards / Preparation Pillars */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Objective 10-Point Scoring</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Clear scoring breakdown showing exactly how an interviewer evaluates technical accuracy, depth, and communication.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">What Was Missing</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Constructive feedback pinpoints forgotten edge cases, syntax nuances, or unstated metrics without harsh rejection.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Model Sample Answers</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Learn from industry-standard model answers that you can review and adopt before stepping into your actual interview.
              </p>
            </div>
          </div>
        </div>

        {/* Deployment notice badge */}
        {!hasGeminiKey && (
          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-900">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                Running in curated offline mode. To activate live Gemini 3.8 Flash generation, configure your free API key.
              </span>
            </div>
            <button
              onClick={onOpenDeployModal}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shrink-0 transition-colors"
            >
              Setup API Key
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
