export interface Player {
  name: string;
  imageUrl: string;
  score: number;
  modifiedThisRound?: boolean;
}

export interface QuizGreeting {
    title: string;
    preImageText?: string;
    image?: string;
    postImageText?: string;
}

export interface AudioOptions {
  src: string;
  type: string;
  startTime: number;
  playTime?: number;
}

export interface Question {
  questionHeader: string;
  questionText: string;
  questionEndText?: string;
  optionsValues?: string[];
  image?: string;
  audio?: AudioOptions;
  timerCountdown?: number;
}

export interface Quiz {
  greeting: QuizGreeting;
  questions: Question[];
}
