export type Topic = 'HR Interview' | 'SQL' | 'Python' | 'Excel' | 'Power BI' | 'Aptitude';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type PracticeLength = 5 | 10;

export interface QuestionItem {
  id: string;
  topic: Topic;
  difficulty: Difficulty;
  question: string;
  contextOrScenario?: string;
  categoryHint?: string;
  expectedKeyPoints?: string[];
  sampleAnswer?: string;
}

export interface AnswerEvaluation {
  score: number; // 0 to 10
  whatWasCorrect: string;
  whatWasMissingOrIncorrect: string;
  improvedSampleAnswer: string;
  improvementTip: string;
  coachCommentary?: string;
  isAiGenerated: boolean;
}

export interface SessionQuestionRecord {
  questionNumber: number;
  question: QuestionItem;
  studentAnswer: string;
  evaluation: AnswerEvaluation;
  timeSpentSeconds: number;
}

export interface SessionResults {
  totalScore: number;
  maxScore: number;
  percentage: number;
  performanceTier: 'Outstanding' | 'Placement Ready' | 'Solid Contender' | 'Developing Skills' | 'Needs Revision';
  strengths: string[];
  areasForImprovement: string[];
  recommendedTopics: string[];
  coachSummary: string;
  records: SessionQuestionRecord[];
}

export interface PracticeConfig {
  topic: Topic;
  difficulty: Difficulty;
  length: PracticeLength;
  studentName?: string;
  targetRole?: string;
}
