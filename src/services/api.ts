import { Topic, Difficulty, QuestionItem, AnswerEvaluation, SessionResults, SessionQuestionRecord } from '../types/interview';
import { SAMPLE_QUESTIONS, generateOfflineEvaluation } from '../data/questionBank';

export async function fetchHealth(): Promise<{ status: string; hasGeminiKey: boolean; model: string }> {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) throw new Error('Health check failed');
    return await res.json();
  } catch (err) {
    console.warn('API health check error, running in resilient mode:', err);
    return { status: 'offline', hasGeminiKey: false, model: 'local-fallback' };
  }
}

export async function fetchQuestion(
  topic: Topic,
  difficulty: Difficulty,
  questionIndex: number,
  previousQuestions: string[]
): Promise<{ question: QuestionItem; source: string }> {
  try {
    const res = await fetch('/api/generate-question', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic,
        difficulty,
        questionIndex,
        previousQuestions,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.question) {
        return data;
      }
    }
  } catch (err) {
    console.warn('Failed to fetch dynamic question, using fallback question bank:', err);
  }

  // Resilient fallback to curated question bank
  const pool = SAMPLE_QUESTIONS.filter(q => q.topic === topic);
  const diffPool = pool.filter(q => q.difficulty === difficulty);
  const candidate = diffPool.find(q => !previousQuestions.includes(q.question))
    || pool.find(q => !previousQuestions.includes(q.question))
    || pool[questionIndex % pool.length]
    || SAMPLE_QUESTIONS[0];

  return { question: candidate, source: 'fallback_bank' };
}

export async function submitAnswerEvaluation(
  question: QuestionItem,
  studentAnswer: string,
  topic: Topic,
  difficulty: Difficulty
): Promise<AnswerEvaluation> {
  try {
    const res = await fetch('/api/evaluate-answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question,
        studentAnswer,
        topic,
        difficulty,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && typeof data.score === 'number') {
        return data;
      }
    }
  } catch (err) {
    console.warn('Server evaluation failed, using offline fallback evaluator:', err);
  }

  return generateOfflineEvaluation(question, studentAnswer);
}

export async function fetchSessionSummary(
  topic: Topic,
  difficulty: Difficulty,
  records: SessionQuestionRecord[]
): Promise<Omit<SessionResults, 'records' | 'totalScore' | 'maxScore' | 'percentage' | 'performanceTier'>> {
  const totalScore = records.reduce((acc, r) => acc + r.evaluation.score, 0);
  const maxScore = records.length * 10;
  const questionScores = records.map(r => ({
    question: r.question.question,
    score: r.evaluation.score,
  }));

  try {
    const res = await fetch('/api/summarize-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic,
        difficulty,
        totalScore,
        maxScore,
        questionScores,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.strengths) {
        return data;
      }
    }
  } catch (err) {
    console.warn('Session summary API call failed, generating calculated breakdown:', err);
  }

  // Fallback summary
  const percentage = Math.round((totalScore / maxScore) * 100);
  return {
    strengths: [
      `Completed all ${records.length} practice questions in ${topic} (${difficulty} level).`,
      `Achieved an overall score of ${totalScore}/${maxScore} (${percentage}%).`,
      'Demonstrated structured attempt and commitment to interview preparation.',
    ],
    areasForImprovement: [
      'Incorporate more quantitative metrics, technical details, and trade-offs into your explanations.',
      'Refine answer structure by defining concepts first, followed by concrete examples or code, and concluding with impact.',
      'Increase familiarity with tricky interview edge cases and alternative approaches.',
    ],
    recommendedTopics: [
      `${topic}: Advanced concepts and optimization`,
      'Campus Aptitude & Quantitative Reasoning',
      'Behavioral STAR Method (Situation, Task, Action, Result)',
    ],
    coachSummary: `Solid hustle! You completed your ${topic} practice round with ${percentage}%. Consistent daily mock sessions will give you a massive edge in campus placements!`,
  };
}
