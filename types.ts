
export enum View {
  Home,
  Stories,
  Map,
  Calendar,
  Quiz,
  Library,
}

export interface Story {
  title: string;
  content: string;
}

export interface Festivity {
  name: string;
  date: string;
  description: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}
