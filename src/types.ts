export interface Skill {
  name: string;
  category: 'Testing' | 'Tools';
  proficiency?: number; // optional, e.g., 95%
  description?: string;
}

export interface Service {
  title: string;
  icon: string;
  items: string[];
  description: string;
}

export interface BugReport {
  id: string;
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  category: 'Functional' | 'UI' | 'Validation' | 'Calculation';
  steps: string[];
  expected: string;
  actual: string;
  environment: string;
  screenshotLabel?: string;
}

export interface PortfolioProject {
  title: string;
  bugsFound: number;
  testCases: number;
  tags: string[];
  description: string;
  category: string;
  detailedBugs: BugReport[];
}

export interface StatItem {
  value: string;
  label: string;
  icon: string;
}
