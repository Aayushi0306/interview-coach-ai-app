import React, { useState } from 'react';
import {
  Trophy,
  Award,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Copy,
  Check,
  Printer,
  ChevronDown,
  ChevronUp,
  Target,
  BookOpen,
  Share2,
} from 'lucide-react';
import {
  PracticeConfig,
  SessionQuestionRecord,
  SessionResults,
} from '../types/interview';

interface ResultsDashboardProps {
  config: PracticeConfig;
  records: SessionQuestionRecord[];
  summaryData: {
    strengths: string[];
    areasForImprovement: string[];
    recommendedTopics: string[];
    coachSummary: string;
  };
  onRestart: () => void;
  onPracticeNewTopic: (topic: any) => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  config,
  records,
  summaryData,
  onRestart,
  onPracticeNewTopic,
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const totalScore = records.reduce((acc, r) => acc + r.evaluation.score, 0);
  const maxScore = records.length * 10;
  const percentage = Math.round((totalScore / maxScore) * 100);

  const getTier = (pct: number) => {
    if (pct >= 85) return {
      tier: 'Placement Ready 🚀',
      color: 'text-emerald-700 bg-emerald-100 border-emerald-300',
      description: 'Superb performance! Your technical answers and structure are ready for top-tier campus interviews.',
    };
    if (pct >= 70) return {
      tier: 'Strong Contender 💼',
      color: 'text-blue-700 bg-blue-100 border-blue-300',
      description: 'Solid conceptual baseline! With a bit more polish on edge cases and metrics, you will stand out.',
    };
    if (pct >= 50) return {
      tier: 'Developing Skills 📈',
      color: 'text-amber-800 bg-amber-100 border-amber-300',
      description: 'Good fundamentals, but you missed several critical technical requirements and structured formats.',
    };
    return {
      tier: 'Needs Revision 📚',
      color: 'text-rose-800 bg-rose-100 border-rose-300',
      description: 'Review the sample model answers below and focus on core definitions before re-attempting.',
    };
  };

  const performanceTier = getTier(percentage);

  const handleCopySummary = () => {
    const text = `🎯 AI Interview Prep Buddy - Session Report
Topic: ${config.topic} (${config.difficulty} Level)
Candidate: ${config.studentName || 'Student'}
Overall Score: ${totalScore} / ${maxScore} (${percentage}%)
Performance Tier: ${performanceTier.tier}

Coach Summary:
"${summaryData.coachSummary}"

Key Strengths:
${summaryData.strengths.map((s) => `• ${s}`).join('\n')}

Areas for Improvement:
${summaryData.areasForImprovement.map((a) => `• ${a}`).join('\n')}

Recommended Topics to Practise:
${summaryData.recommendedTopics.map((t) => `• ${t}`).join('\n')}
`;
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-blue-900/50 print:bg-white print:text-black print:p-0">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-4 border border-blue-400/30">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Practice Session Completed</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
            Interview Performance Report
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-xl mx-auto">
            {config.studentName ? `${config.studentName}'s ` : ''}results for{' '}
            <strong className="text-white">{config.topic}</strong> ({config.difficulty} Level)
          </p>

          {/* Big Score Card */}
          <div className="mt-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-md mx-auto shadow-xl">
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <div className="text-xs uppercase font-bold text-slate-300 tracking-wider">
                  Total Score
                </div>
                <div className="text-4xl sm:text-5xl font-black text-white mt-1">
                  {totalScore}
                  <span className="text-xl text-slate-300 font-semibold">/{maxScore}</span>
                </div>
              </div>

              <div className="h-12 w-px bg-white/20" />

              <div className="text-center">
                <div className="text-xs uppercase font-bold text-slate-300 tracking-wider">
                  Percentage
                </div>
                <div className="text-4xl sm:text-5xl font-black text-blue-300 mt-1">
                  {percentage}%
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <span className={`inline-block px-3.5 py-1 rounded-full text-xs font-bold border ${performanceTier.color}`}>
                {performanceTier.tier}
              </span>
              <p className="text-xs text-slate-200 mt-2">
                {performanceTier.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Dashboard */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 space-y-8">
        {/* Coach alex final message & action tools */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Coach Alex's Placement Assessment
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Comprehensive evaluation synthesized from your {records.length} question attempts.
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={handleCopySummary}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                title="Copy full summary report to clipboard"
              >
                {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSummary ? 'Copied Report' : 'Copy Summary'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors print:hidden"
                title="Print or Save PDF report"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Save PDF</span>
              </button>
            </div>
          </div>

          {/* Coach's quote */}
          <div className="bg-blue-50/80 border-l-4 border-blue-600 p-4 rounded-r-xl">
            <p className="text-sm font-medium text-blue-950 leading-relaxed italic">
              "{summaryData.coachSummary}"
            </p>
          </div>

          {/* Strengths & Improvement Areas 2-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Key Strengths</h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                {summaryData.strengths.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas for Improvement */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Areas for Improvement</h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                {summaryData.areasForImprovement.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommended Topics to Practise */}
          <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Recommended Topics to Practise Next</h3>
                <p className="text-xs text-slate-500">
                  Targeted focus areas to raise your placement conversion probability
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
              {summaryData.recommendedTopics.map((topicItem, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-blue-200/80 rounded-xl p-3 shadow-xs flex items-center gap-2 text-xs font-semibold text-blue-950"
                >
                  <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{topicItem}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Question-by-Question Breakdown */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Question-by-Question Detailed Review
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Review your answers alongside Coach Alex's scoring and improved model solutions.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {records.map((record, index) => {
              const isExpanded = expandedIndex === index;
              const evalScore = record.evaluation.score;
              const scoreBadgeColor =
                evalScore >= 8
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : evalScore >= 6
                  ? 'bg-blue-100 text-blue-800 border-blue-300'
                  : evalScore >= 4
                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                  : 'bg-rose-100 text-rose-800 border-rose-300';

              return (
                <div
                  key={index}
                  className="border border-slate-200 rounded-xl overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    className="w-full p-4 sm:p-5 text-left bg-slate-50/70 hover:bg-slate-100 flex items-center justify-between gap-4 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-slate-800 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {record.questionNumber}
                      </span>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1">
                          {record.question.question}
                        </h4>
                        <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                          <span>Time: {record.timeSpentSeconds}s</span>
                          <span>•</span>
                          <span>{record.studentAnswer.split(/\s+/).filter(Boolean).length} words</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${scoreBadgeColor}`}>
                        {evalScore} / 10
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-5 sm:p-6 bg-white border-t border-slate-200 space-y-5 text-xs sm:text-sm animate-in fade-in-50">
                      {/* Candidate Answer */}
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <span className="font-bold text-slate-700 block mb-1 text-xs uppercase tracking-wider">
                          Your Submitted Answer:
                        </span>
                        <p className="text-slate-800 whitespace-pre-wrap font-sans leading-relaxed">
                          {record.studentAnswer}
                        </p>
                      </div>

                      {/* Correct vs Missing */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
                          <span className="font-bold text-emerald-950 block mb-1 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            What was correct:
                          </span>
                          <p className="text-slate-700 leading-relaxed">
                            {record.evaluation.whatWasCorrect}
                          </p>
                        </div>

                        <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200">
                          <span className="font-bold text-amber-950 block mb-1 flex items-center gap-1.5">
                            <AlertCircle className="w-4 h-4 text-amber-600" />
                            What was missing or incorrect:
                          </span>
                          <p className="text-slate-700 leading-relaxed">
                            {record.evaluation.whatWasMissingOrIncorrect}
                          </p>
                        </div>
                      </div>

                      {/* Improved Sample Answer */}
                      <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                            Model Sample Answer:
                          </span>
                        </div>
                        <pre className="font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed overflow-x-auto bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                          {record.evaluation.improvedSampleAnswer}
                        </pre>
                      </div>

                      {/* Improvement Tip */}
                      <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 flex items-start gap-2.5">
                        <Lightbulb className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-sky-950">Placement Tip: </span>
                          <span className="text-sky-900">{record.evaluation.improvementTip}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Navigation & Restart Button */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Ready for your next round?</h3>
            <p className="text-xs text-slate-500">
              Practice another topic or challenge yourself at Advanced difficulty!
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onRestart}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-bold rounded-xl shadow-lg shadow-blue-700/25 flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Restart Practice</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
