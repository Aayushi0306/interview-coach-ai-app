import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Clock,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Info,
} from 'lucide-react';
import {
  Topic,
  Difficulty,
  PracticeLength,
  QuestionItem,
  AnswerEvaluation,
  SessionQuestionRecord,
  PracticeConfig,
} from '../types/interview';
import { FeedbackCard } from './FeedbackCard';
import { submitAnswerEvaluation, fetchQuestion } from '../services/api';

interface InterviewChatProps {
  config: PracticeConfig;
  onFinishSession: (records: SessionQuestionRecord[]) => void;
  onRestart: () => void;
}

export const InterviewChat: React.FC<InterviewChatProps> = ({
  config,
  onFinishSession,
  onRestart,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionItem | null>(null);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [records, setRecords] = useState<SessionQuestionRecord[]>([]);
  const [currentEvaluation, setCurrentEvaluation] = useState<AnswerEvaluation | null>(null);

  const [isLoadingQuestion, setIsLoadingQuestion] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showPreviousHistory, setShowPreviousHistory] = useState(false);

  // Timer per question
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Start timer for current question
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSecondsElapsed(0);

    timerRef.current = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentQuestionIndex]);

  // Load question whenever questionIndex changes
  useEffect(() => {
    let isMounted = true;
    async function loadNextQuestion() {
      setIsLoadingQuestion(true);
      setErrorMessage(null);
      setCurrentEvaluation(null);
      setStudentAnswer('');
      setShowHint(false);

      const previousQuestionTexts = records.map((r) => r.question.question);
      try {
        const { question } = await fetchQuestion(
          config.topic,
          config.difficulty,
          currentQuestionIndex,
          previousQuestionTexts
        );
        if (isMounted) {
          setCurrentQuestion(question);
          setIsLoadingQuestion(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching question:', err);
          setErrorMessage('Failed to load the question. Click retry below.');
          setIsLoadingQuestion(false);
        }
      }
    }

    loadNextQuestion();

    return () => {
      isMounted = false;
    };
  }, [currentQuestionIndex, config.topic, config.difficulty]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const handleSubmitAnswer = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentQuestion) return;

    const trimmed = studentAnswer.trim();
    if (!trimmed) {
      setErrorMessage('Please enter an answer before submitting. Even a partial or draft attempt helps!');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const evaluation = await submitAnswerEvaluation(
        currentQuestion,
        trimmed,
        config.topic,
        config.difficulty
      );

      setCurrentEvaluation(evaluation);

      // Record this question's result
      const newRecord: SessionQuestionRecord = {
        questionNumber: currentQuestionIndex + 1,
        question: currentQuestion,
        studentAnswer: trimmed,
        evaluation,
        timeSpentSeconds: secondsElapsed,
      };

      setRecords((prev) => [...prev, newRecord]);
    } catch (err) {
      console.error('Evaluation failed:', err);
      setErrorMessage('Evaluation request failed. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 >= config.length) {
      // Completed all questions!
      onFinishSession(records);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const progressPercent = Math.round(((currentQuestionIndex + (currentEvaluation ? 1 : 0)) / config.length) * 100);

  const getPlaceholder = (topic: Topic) => {
    switch (topic) {
      case 'SQL':
        return 'Write your SQL query (e.g. SELECT ... FROM ... WHERE ... GROUP BY ...) or explain your step-by-step logic and join strategy...';
      case 'Python':
        return 'Write your Python implementation or describe your algorithmic logic, data structures, and time complexity...';
      case 'HR Interview':
        return 'Structure your answer using the STAR method: Situation (Context) -> Task (Goal) -> Action (What YOU did) -> Result (Quantifiable outcome)...';
      case 'Excel':
        return 'State the Excel formula (e.g. =XLOOKUP(...) or nested IF), explain arguments, and how you would format or validate the dataset...';
      case 'Power BI':
        return 'Describe your data model (Fact/Dimensions), DAX measures (e.g. CALCULATE, RELATED), and visual approach...';
      case 'Aptitude':
        return 'Show your step-by-step mathematical reasoning, formulas used, unit conversions, and final calculated answer...';
      default:
        return 'Type your response here. Aim for clear definitions, examples, and structured reasoning...';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      {/* Session Header / Navigation Bar */}
      <div className="bg-slate-900 border-b border-slate-800 text-white py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white">
              {config.topic}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
              {config.difficulty}
            </span>
            {config.studentName && (
              <span className="text-xs text-slate-400">
                Candidate: <strong className="text-white">{config.studentName}</strong>
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-slate-300 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>Time: <strong>{formatTime(secondsElapsed)}</strong></span>
            </div>
            <div className="text-slate-300">
              Question <strong>{currentQuestionIndex + 1}</strong> of <strong>{config.length}</strong>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mt-3">
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-6 space-y-6">
        {/* Previous Questions Collapsible History (if any) */}
        {records.length > 0 && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <button
              type="button"
              onClick={() => setShowPreviousHistory(!showPreviousHistory)}
              className="w-full px-4 py-2.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 transition-colors"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>
                  Previous Questions Answered ({records.length} / {config.length})
                </span>
              </div>
              <div className="flex items-center gap-1 text-slate-500">
                <span>{showPreviousHistory ? 'Hide' : 'Review'}</span>
                {showPreviousHistory ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </div>
            </button>

            {showPreviousHistory && (
              <div className="p-4 divide-y divide-slate-100 text-xs space-y-3">
                {records.map((rec, i) => (
                  <div key={i} className="pt-2 first:pt-0">
                    <div className="flex items-center justify-between font-semibold text-slate-900 mb-1">
                      <span>Q{rec.questionNumber}: {rec.question.question}</span>
                      <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">
                        {rec.evaluation.score}/10
                      </span>
                    </div>
                    <p className="text-slate-600 line-clamp-1 italic">
                      Your answer: "{rec.studentAnswer}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Coach & Question Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/90 overflow-hidden">
          {/* Coach Header */}
          <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm sm:text-base text-white">Coach Alex</h3>
                  <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.2 rounded-full">
                    Active Interviewer
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  {config.studentName ? `Evaluating for ${config.studentName}` : 'Guiding your placement success'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {currentQuestion?.categoryHint && (
                <button
                  type="button"
                  onClick={() => setShowHint(!showHint)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-800/60 hover:bg-blue-800 text-blue-200 text-xs font-medium border border-blue-700/60 transition-colors"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Question Body */}
          <div className="p-6 sm:p-8">
            {isLoadingQuestion ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                <p className="text-sm font-semibold text-slate-700">
                  Coach Alex is framing your next interview question...
                </p>
                <p className="text-xs text-slate-400">
                  Tailoring for {config.topic} ({config.difficulty} level)
                </p>
              </div>
            ) : currentQuestion ? (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 text-xs font-bold shrink-0 mt-0.5">
                    Q{currentQuestionIndex + 1}
                  </span>
                  <div className="flex-1">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                      {currentQuestion.question}
                    </h2>
                    {currentQuestion.contextOrScenario && (
                      <p className="text-xs sm:text-sm text-slate-600 mt-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <strong className="text-slate-800 font-semibold">Context / Scenario: </strong>
                        {currentQuestion.contextOrScenario}
                      </p>
                    )}
                  </div>
                </div>

                {/* Hint Display */}
                {showHint && currentQuestion.categoryHint && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5 animate-in fade-in-50">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Coach's Framework Hint: </span>
                      {currentQuestion.categoryHint}
                    </div>
                  </div>
                )}
              </div>
            ) : null}

            {errorMessage && (
              <div className="mt-4 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
                <button
                  onClick={() => setCurrentQuestionIndex(currentQuestionIndex)}
                  className="px-2.5 py-1 bg-rose-600 text-white rounded font-medium text-xs hover:bg-rose-700"
                >
                  Retry
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Answer Box or Evaluated Feedback Card */}
        {currentEvaluation ? (
          <FeedbackCard
            evaluation={currentEvaluation}
            onNextQuestion={handleNextQuestion}
            isLastQuestion={currentQuestionIndex + 1 >= config.length}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={config.length}
          />
        ) : (
          <form
            onSubmit={handleSubmitAnswer}
            className="bg-white rounded-2xl shadow-lg border border-slate-200/90 p-5 sm:p-7 space-y-4"
          >
            <div className="flex items-center justify-between">
              <label htmlFor="student-answer-input" className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                <span>Your Answer as the Candidate:</span>
              </label>
              <div className="text-xs text-slate-400">
                <span>{studentAnswer.trim().split(/\s+/).filter(Boolean).length} words</span>
                <span className="mx-1">•</span>
                <span>{studentAnswer.length} characters</span>
              </div>
            </div>

            <div className="relative">
              <textarea
                ref={textareaRef}
                id="student-answer-input"
                rows={6}
                value={studentAnswer}
                onChange={(e) => {
                  setStudentAnswer(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                disabled={isSubmitting || isLoadingQuestion}
                placeholder={getPlaceholder(config.topic)}
                className="w-full p-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-sm sm:text-base text-slate-900 bg-white placeholder:text-slate-400 font-sans leading-relaxed disabled:bg-slate-50 transition-all"
              />
            </div>

            {/* Answer Guidelines & Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>
                  Provide complete sentences, syntax, or STAR points for a top score out of 10.
                </span>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setStudentAnswer('')}
                  disabled={isSubmitting || !studentAnswer}
                  className="px-3.5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 disabled:opacity-40 transition-colors"
                >
                  Clear
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || isLoadingQuestion || !studentAnswer.trim()}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 disabled:from-slate-400 disabled:to-slate-400 text-white font-bold rounded-xl shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 text-sm transition-all transform active:scale-95 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Evaluating Answer...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Answer</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
