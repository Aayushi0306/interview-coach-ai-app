import express, { Request, Response } from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import { SAMPLE_QUESTIONS, generateOfflineEvaluation } from '../src/data/questionBank.js';
import { QuestionItem, Topic, Difficulty } from '../src/types/interview.js';

const app = express();
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey.trim() !== '' && apiKey !== 'MY_GEMINI_API_KEY') {
  aiClient = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

let isGeminiPermissionDenied = false;

function handleGeminiError(action: string, error: any) {
  const errMsg = error?.message || String(error);
  if (
    error?.status === 403 ||
    errMsg.includes('PERMISSION_DENIED') ||
    errMsg.includes('denied access') ||
    errMsg.includes('403')
  ) {
    isGeminiPermissionDenied = true;
    return;
  }
  console.warn(`[Vercel API] ${action} notice: using curated fallback.`, errMsg);
}

// Health check endpoint
app.get(['/api/health', '/health'], (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    hasGeminiKey: !!aiClient && !isGeminiPermissionDenied,
    isKeyRestricted: isGeminiPermissionDenied,
    model: isGeminiPermissionDenied ? 'curated-placement-bank' : 'gemini-3.8-flash',
  });
});

// Generate dynamic interview question
app.post(['/api/generate-question', '/generate-question'], async (req: Request, res: Response) => {
  const { topic, difficulty, questionIndex, previousQuestions } = req.body as {
    topic: Topic;
    difficulty: Difficulty;
    questionIndex: number;
    previousQuestions?: string[];
  };

  const pool = SAMPLE_QUESTIONS.filter(q => q.topic === topic);
  const exactDiffPool = pool.filter(q => q.difficulty === difficulty);
  const usedList = previousQuestions || [];
  const unusedFromBank = exactDiffPool.find(q => !usedList.includes(q.question))
    || pool.find(q => !usedList.includes(q.question))
    || exactDiffPool[0]
    || pool[0];

  if (!aiClient || isGeminiPermissionDenied) {
    if (unusedFromBank) {
      return res.json({ question: unusedFromBank, source: 'curated_bank' });
    }
  }

  try {
    if (aiClient && !isGeminiPermissionDenied) {
      const prompt = `You are a supportive, seasoned senior interviewer and placement director conducting a campus mock interview.
Target Candidate: College student or recent graduate preparing for job placements.
Topic: ${topic}
Difficulty Level: ${difficulty}
Question Number in Session: ${questionIndex + 1}
Previous questions asked in this session (DO NOT repeat these topics or phrasing):
${(previousQuestions || []).map((q, idx) => `${idx + 1}. ${q}`).join('\n')}

Role & Instructions:
1. Generate ONE realistic, high-quality interview question commonly asked in top companies for ${topic} at ${difficulty} level.
2. Provide a realistic context or scenario explaining why the interviewer asks this.
3. Provide a concise category hint (e.g. key formula, STAR approach, or syntax tip).
4. Provide 3-4 bullet points of what a high-scoring candidate answer must cover.
5. Strictly stay within the domain of ${topic} and difficulty ${difficulty}.
6. Do NOT answer the question. Only generate the question structure.`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are an expert technical and HR interviewer preparing college students for placement exams and interviews. Be rigorous, professional, and clear.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING, description: 'The exact interview question asked to the candidate' },
              contextOrScenario: { type: Type.STRING, description: 'Brief context or workplace scenario behind this question' },
              categoryHint: { type: Type.STRING, description: 'A helpful hint on how to structure the response' },
              expectedKeyPoints: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Key principles or criteria expected in a full-credit answer',
              },
            },
            required: ['question', 'contextOrScenario', 'categoryHint', 'expectedKeyPoints'],
          },
        },
      });

      const responseText = response.text;
      if (responseText) {
        const parsed = JSON.parse(responseText.trim());
        const generatedQuestion: QuestionItem = {
          id: `ai-gen-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          topic,
          difficulty,
          question: parsed.question,
          contextOrScenario: parsed.contextOrScenario,
          categoryHint: parsed.categoryHint,
          expectedKeyPoints: parsed.expectedKeyPoints,
        };
        return res.json({ question: generatedQuestion, source: 'gemini' });
      }
    }
  } catch (error) {
    handleGeminiError('Question generation', error);
  }

  res.json({ question: unusedFromBank, source: 'fallback_bank' });
});

// Evaluate student answer
app.post(['/api/evaluate-answer', '/evaluate-answer'], async (req: Request, res: Response) => {
  const { question, studentAnswer, topic, difficulty } = req.body as {
    question: QuestionItem;
    studentAnswer: string;
    topic: Topic;
    difficulty: Difficulty;
  };

  if (!question || typeof studentAnswer !== 'string') {
    return res.status(400).json({ error: 'Missing question or student answer' });
  }

  const trimmedAnswer = studentAnswer.trim();

  if (trimmedAnswer.length === 0) {
    return res.json({
      score: 0,
      whatWasCorrect: 'No answer was provided.',
      whatWasMissingOrIncorrect: 'The answer box was submitted blank. Please provide your explanation or attempt.',
      improvedSampleAnswer: question.expectedKeyPoints
        ? `A complete answer should address: ${question.expectedKeyPoints.join('; ')}.`
        : 'In an interview, never leave a question completely blank.',
      improvementTip: 'If you are unsure during an interview, ask clarifying questions or explain your thinking process aloud.',
      coachCommentary: 'Take a deep breath! Try writing down what you know about the core concept.',
      isAiGenerated: false,
    });
  }

  if (!aiClient || isGeminiPermissionDenied) {
    const offlineEval = generateOfflineEvaluation(question, studentAnswer);
    return res.json(offlineEval);
  }

  try {
    const prompt = `You are a supportive, experienced interview coach evaluating a college student's answer in a mock placement interview.

Topic: ${topic}
Difficulty: ${difficulty}
Question Asked: "${question.question}"
Scenario/Context: "${question.contextOrScenario || 'N/A'}"
Expected Criteria / Key Concepts: ${(question.expectedKeyPoints || []).join('; ')}

Student's Submitted Answer:
"""
${trimmedAnswer}
"""

Evaluation Guidelines:
1. Act as an encouraging, professional interview coach.
2. Calibrate score strictly out of 10.
3. Return required JSON fields.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER, description: 'Score out of 10' },
            whatWasCorrect: { type: Type.STRING, description: 'What the student did well' },
            whatWasMissingOrIncorrect: { type: Type.STRING, description: 'What was missing or incorrect' },
            improvedSampleAnswer: { type: Type.STRING, description: 'Model answer for the student to learn from' },
            improvementTip: { type: Type.STRING, description: 'One actionable tip for real interviews' },
            coachCommentary: { type: Type.STRING, description: 'Supportive coaching encouragement' },
          },
          required: ['score', 'whatWasCorrect', 'whatWasMissingOrIncorrect', 'improvedSampleAnswer', 'improvementTip', 'coachCommentary'],
        },
      },
    });

    const responseText = response.text;
    if (responseText) {
      const parsed = JSON.parse(responseText.trim());
      const normalizedScore = Math.max(0, Math.min(10, Math.round(Number(parsed.score) || 0)));
      return res.json({
        score: normalizedScore,
        whatWasCorrect: parsed.whatWasCorrect,
        whatWasMissingOrIncorrect: parsed.whatWasMissingOrIncorrect,
        improvedSampleAnswer: parsed.improvedSampleAnswer,
        improvementTip: parsed.improvementTip,
        coachCommentary: parsed.coachCommentary,
        isAiGenerated: true,
      });
    }
  } catch (error) {
    handleGeminiError('Answer evaluation', error);
  }

  const fallbackEval = generateOfflineEvaluation(question, studentAnswer);
  res.json(fallbackEval);
});

// Final session summary and recommendations
app.post(['/api/summarize-session', '/summarize-session'], async (req: Request, res: Response) => {
  const { topic, difficulty, totalScore, maxScore, questionScores } = req.body as {
    topic: Topic;
    difficulty: Difficulty;
    totalScore: number;
    maxScore: number;
    questionScores: { question: string; score: number }[];
  };

  const percentage = Math.round((totalScore / maxScore) * 100);

  if (!aiClient || isGeminiPermissionDenied) {
    return res.json({
      strengths: [
        `Demonstrated steady engagement across ${questionScores?.length || 5} questions in ${topic}.`,
        'Articulated conceptual reasoning and attempted structured solutions.',
        'Showed good baseline awareness of placement interview requirements.',
      ],
      areasForImprovement: [
        'Elaborate more on practical scenarios and quantitative outcomes.',
        'Deepen technical edge-case coverage and standard terminology.',
        'Practice time-efficient structuring using standard frameworks.',
      ],
      recommendedTopics: [
        topic === 'HR Interview' ? 'STAR Method Deep Dive' : `${topic} Intermediate Concepts`,
        'Mock Time-Pressured Problem Solving',
        'Company-Specific Placement Question Archives',
      ],
      coachSummary: `You earned ${totalScore}/${maxScore} (${percentage}%). Keep building your confidence with daily practice sprints!`,
    });
  }

  try {
    const prompt = `A college student completed an interview practice session.
Topic: ${topic}
Difficulty: ${difficulty}
Total Score: ${totalScore} out of ${maxScore} (${percentage}%)
Questions & Scores:
${(questionScores || []).map((q, i) => `Q${i + 1}: "${q.question}" -> Score: ${q.score}/10`).join('\n')}

Generate a comprehensive final interview performance analysis:
1. strengths: Array of 3 specific positive strengths observed.
2. areasForImprovement: Array of 3 specific, constructive areas the student should polish before their real campus placement interview.
3. recommendedTopics: Array of 3-4 specific high-yield subtopics or related subjects to study next.
4. coachSummary: An inspiring, supportive 2-3 sentence summary message from Coach Alex tailored to their score.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            areasForImprovement: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendedTopics: { type: Type.ARRAY, items: { type: Type.STRING } },
            coachSummary: { type: Type.STRING },
          },
          required: ['strengths', 'areasForImprovement', 'recommendedTopics', 'coachSummary'],
        },
      },
    });

    const responseText = response.text;
    if (responseText) {
      const parsed = JSON.parse(responseText.trim());
      return res.json(parsed);
    }
  } catch (error) {
    handleGeminiError('Session summarization', error);
  }

  res.json({
    strengths: [
      `Consistent participation in ${topic} practice.`,
      'Willingness to tackle varying difficulty questions.',
      'Clear commitment to placement readiness.',
    ],
    areasForImprovement: [
      'Focus on technical depth and direct problem-solving.',
      'Practice answering within structured time limits.',
    ],
    recommendedTopics: [`${topic} Core Principles`, 'Aptitude & Logical Reasoning', 'Behavioral Interview STAR Technique'],
    coachSummary: `Great hustle! Your final score is ${totalScore}/${maxScore} (${percentage}%). Consistent practice is the key to landing your dream offer.`,
  });
});

export default app;
