export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  watchers_count: number;
  updated_at: string;
  created_at: string;
  language: string;
  size: number;
  default_branch: string;
  html_url: string;
}

export interface FrameworkData {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stars: number;
  forks: number;
  issues: number;
  watchers: number;
  lastUpdate: Date;
  created: Date;
  language: string;
  size: number;
  url: string;
  daysSinceUpdate: number;
  popularity: number;
  community: number;
  maintenance: number;
  maturity: number;
}

export interface FuzzyNumber {
  low: number;
  mid: number;
  high: number;
}

export interface FuzzyWeight {
  popularity: FuzzyNumber;
  community: FuzzyNumber;
  maintenance: FuzzyNumber;
  maturity: FuzzyNumber;
}

export interface FuzzyRating {
  [key: string]: FuzzyNumber;
}

export interface MADMResult {
  framework: FrameworkData;
  score: number;
  rank: number;
  fuzzyScore: FuzzyNumber;
}

export interface AnalysisConfig {
  weights: FuzzyWeight;
  minStars: number;
  maxAge: number; // in years
  frameworks: string[];
}