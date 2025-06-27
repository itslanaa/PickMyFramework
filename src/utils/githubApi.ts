import { GitHubRepo, FrameworkData } from '../types';

const GITHUB_API_BASE = 'https://api.github.com';

export class GitHubAPI {
  private apiKey: string;
  private rateLimitRemaining: number = 5000;
  private rateLimitReset: number = 0;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async makeRequest(url: string): Promise<any> {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Fuzzy-MADM-Framework-Analyzer'
    };

    if (this.apiKey) {
      headers['Authorization'] = `token ${this.apiKey}`;
    }

    const response = await fetch(url, { headers });

    // Update rate limit info
    this.rateLimitRemaining = parseInt(response.headers.get('X-RateLimit-Remaining') || '0');
    this.rateLimitReset = parseInt(response.headers.get('X-RateLimit-Reset') || '0');

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async searchRepositories(query: string, perPage: number = 30): Promise<GitHubRepo[]> {
    const url = `${GITHUB_API_BASE}/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=${perPage}`;
    const data = await this.makeRequest(url);
    return data.items || [];
  }

  async getRepository(owner: string, repo: string): Promise<GitHubRepo> {
    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}`;
    return this.makeRequest(url);
  }

  getRateLimitInfo() {
    return {
      remaining: this.rateLimitRemaining,
      reset: new Date(this.rateLimitReset * 1000)
    };
  }
}

export function isWebFramework(repo: GitHubRepo): boolean {
  const frameworkKeywords = [
    'framework', 'react', 'vue', 'angular', 'svelte', 'next', 'nuxt',
    'express', 'fastify', 'koa', 'django', 'flask', 'rails', 'laravel',
    'spring', 'asp.net', 'ember', 'backbone', 'meteor', 'gatsby',
    'remix', 'solid', 'qwik', 'astro', 'sveltekit', 'nestjs'
  ];

  const name = repo.name.toLowerCase();
  const description = (repo.description || '').toLowerCase();
  const fullName = repo.full_name.toLowerCase();

  return frameworkKeywords.some(keyword => 
    name.includes(keyword) || 
    description.includes(keyword) || 
    fullName.includes(keyword)
  );
}

export function transformToFrameworkData(repo: GitHubRepo): FrameworkData {
  const now = new Date();
  const lastUpdate = new Date(repo.updated_at);
  const created = new Date(repo.created_at);
  const daysSinceUpdate = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24));
  const ageInDays = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));

  // Normalize metrics (0-1 scale)
  const popularity = Math.min(repo.stargazers_count / 100000, 1); // Max 100k stars = 1
  const community = Math.min((repo.forks_count + repo.watchers_count) / 50000, 1); // Max 50k = 1
  const maintenance = Math.max(0, 1 - (daysSinceUpdate / 365)); // Recent updates = higher score
  const maturity = Math.min(ageInDays / (365 * 5), 1); // 5+ years = mature

  return {
    id: repo.id,
    name: repo.name,
    full_name: repo.full_name,
    description: repo.description || '',
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    issues: repo.open_issues_count,
    watchers: repo.watchers_count,
    lastUpdate,
    created,
    language: repo.language || 'Unknown',
    size: repo.size,
    url: repo.html_url,
    daysSinceUpdate,
    popularity,
    community,
    maintenance,
    maturity
  };
}