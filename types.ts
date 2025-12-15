export interface Answer {
  category: string; // 病院区分
  functionType: string; // 病院機能
  ward: string; // 病棟
}

export interface Scenario {
  id: number;
  questionText: string;
  correctAnswer: Answer;
  explanation: string;
  tags: string[];
  keyPoint: string; // ワンポイント要約
}

export type AppMode = 'home' | 'study' | 'quiz';
