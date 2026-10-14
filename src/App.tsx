import React, { useState, useEffect } from 'react';
import {
  PracticeConfig,
  SessionQuestionRecord,
  Topic,
} from './types/interview';
import { Navbar } from './components/Navbar';
import { WelcomeScreen } from './components/WelcomeScreen';
import { InterviewChat } from './components/InterviewChat';
import { ResultsDashboard } from './components/ResultsDashboard';
import { DeployModal } from './components/DeployModal';
import { fetchHealth, fetchSessionSummary } from './services/api';

export default function App() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'interview' | 'results'>('welcome');
  const [config, setConfig] = useState<PracticeConfig>({
    topic: 'HR Interview',
    difficulty: 'Beginner',
    length: 5,
  });
  const [records, setRecords] = useState<SessionQuestionRecord[]>([]);
  const [summaryData, setSummaryData] = useState<{
    strengths: string[];
    areasForImprovement: string[];
    recommendedTopics: string[];
    coachSummary: string;
  } | null>(null);

  const [hasGeminiKey, setHasGeminiKey] = useState<boolean>(true);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState<boolean>(false);
  const [isSummarizing, setIsSummarizing] = useState<boolean>(false);

  // Check health on load
  useEffect(() => {
    async function checkBackend() {
      try {
        const health = await fetchHealth();
        setHasGeminiKey(health.hasGeminiKey);
      } catch (err) {
        console.warn('Backend check:', err);
      }
    }
    checkBackend();
  }, []);

  const handleStartPractice = (newConfig: PracticeConfig) => {
    setConfig(newConfig);
    setRecords([]);
    setSummaryData(null);
    setCurrentStep('interview');
  };

  const handleFinishSession = async (finalRecords: SessionQuestionRecord[]) => {
    setRecords(finalRecords);
    setIsSummarizing(true);
    setCurrentStep('results');

    try {
      const summary = await fetchSessionSummary(
        config.topic,
        config.difficulty,
        finalRecords
      );
      setSummaryData(summary);
    } catch (err) {
      console.error('Error fetching summary:', err);
      setSummaryData({
        strengths: [
          `Completed ${finalRecords.length} mock questions in ${config.topic}.`,
          'Demonstrated clear effort and technical articulation.',
        ],
        areasForImprovement: [
          'Incorporate more quantitative metrics and STAR storytelling.',
          'Review syntax edge-cases and optimization trade-offs.',
        ],
        recommendedTopics: [
          `${config.topic} Core Drills`,
          'Campus Placement General Aptitude',
          'STAR Behavioral Strategy',
        ],
        coachSummary: `Good job finishing the session! Keep practicing with Coach Alex to master your placement interviews.`,
      });
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleRestart = () => {
    setRecords([]);
    setSummaryData(null);
    setCurrentStep('welcome');
  };

  const handlePracticeNewTopic = (topic: Topic) => {
    setConfig((prev) => ({ ...prev, topic }));
    setRecords([]);
    setSummaryData(null);
    setCurrentStep('interview');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentStep={currentStep}
        topic={config?.topic}
        difficulty={config?.difficulty}
        questionNumber={records.length + 1}
        totalQuestions={config?.length}
        onOpenDeployModal={() => setIsDeployModalOpen(true)}
        onRestart={handleRestart}
        hasGeminiKey={hasGeminiKey}
      />

      {/* Main View Transition */}
      <div className="flex-1">
        {currentStep === 'welcome' && (
          <WelcomeScreen
            onStartPractice={handleStartPractice}
            hasGeminiKey={hasGeminiKey}
            onOpenDeployModal={() => setIsDeployModalOpen(true)}
          />
        )}

        {currentStep === 'interview' && (
          <InterviewChat
            config={config}
            onFinishSession={handleFinishSession}
            onRestart={handleRestart}
          />
        )}

        {currentStep === 'results' && (
          <>
            {isSummarizing || !summaryData ? (
              <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
                <h2 className="text-xl font-bold text-slate-900">
                  Synthesizing Your Placement Performance Report...
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md">
                  Coach Alex and Gemini AI are evaluating your answers, pinpointing strengths, and designing your personalized improvement plan.
                </p>
              </div>
            ) : (
              <ResultsDashboard
                config={config}
                records={records}
                summaryData={summaryData}
                onRestart={handleRestart}
                onPracticeNewTopic={handlePracticeNewTopic}
              />
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-6 px-4 text-center text-xs print:hidden">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-200">AI Interview Prep Buddy</span>
            <span>•</span>
            <span>Navy Blue Dashboard for Campus Placements</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setIsDeployModalOpen(true)}
              className="hover:text-blue-300 transition-colors"
            >
              Vercel Deployment Guide
            </button>
            <span>•</span>
            <span>Gemini 3.8 Flash Powered</span>
          </div>
        </div>
      </footer>

      {/* Deploy & API Key Help Modal */}
      <DeployModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
      />
    </div>
  );
}
