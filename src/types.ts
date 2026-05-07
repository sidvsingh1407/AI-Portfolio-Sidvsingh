
export interface ToolkitGroup {
  group: string;
  tools: string[];
}

export interface Project {
  id: string;
  slug: string;
  category: 'systems' | 'prototypes';
  title: string;
  problem?: string;
  context?: string;
  approach?: string;
  outcome?: string;
  description?: string;
  status?: string;
  toolkit?: ToolkitGroup[];
  images?: { src: string; alt: string; hint: string; width: number; height: number; }[];
}

export interface Recommendation {
  author: string;
  role: string;
  text: string;
}

export interface Competency {
  title: string;
  description: string;
}

export interface Recognition {
  title: string;
  organization: string;
  date: string;
}

export interface AboutPageData {
  avatar: { src: string; alt: string; hint: string; width: number; height: number; };
  bio: string;
  passion: string;
  journey: { year: string; title: string; organization: string; description: string; }[];
  competencies: Competency[];
  mission: string;
  recognition: Recognition[];
  certifications: string[];
  recommendations: Recommendation[];
}

export interface AgentStackItem {
  title: string;
  description: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category: string;
  image?: string;
  readTime: string;
}

export interface PortfolioData {
  aboutPage: AboutPageData;
  agentStack: AgentStackItem[];
  projects: Project[];
  blogs: BlogPost[];
}
