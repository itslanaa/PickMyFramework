import React, { useState, useCallback } from 'react';
import { ApiKeyInput } from './components/ApiKeyInput';
import { LoadingSpinner } from './components/LoadingSpinner';
import { AnalysisPage } from './components/AnalysisPage';
import { GitHubAPI, isWebFramework, transformToFrameworkData } from './utils/githubApi';
import { calculateFuzzyMADM, defaultWeights } from './utils/fuzzyMadm';
import { MADMResult } from './types';

type AppState = 'input' | 'loading' | 'results';

function App() {
  const [state, setState] = useState<AppState>('input');
  const [apiKey, setApiKey] = useState('');
  const [results, setResults] = useState<MADMResult[]>([]);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [progress, setProgress] = useState(0);

  const performAnalysis = useCallback(async (githubApiKey: string) => {
    setState('loading');
    setProgress(0);
    
    try {
      const api = new GitHubAPI(githubApiKey);
      
      setLoadingMessage('Searching for web development frameworks...');
      setProgress(20);

      // Search for popular frameworks
      const searchQueries = [
        'framework javascript stars:>1000',
        'framework react vue angular stars:>500',
        'framework web development stars:>1000',
        'framework frontend backend stars:>500'
      ];

      let allRepos: any[] = [];
      
      for (let i = 0; i < searchQueries.length; i++) {
        const repos = await api.searchRepositories(searchQueries[i], 50);
        allRepos = [...allRepos, ...repos];
        setProgress(20 + (i + 1) * 15);
      }

      setLoadingMessage('Filtering web development frameworks...');
      setProgress(70);

      // Remove duplicates and filter for web frameworks
      const uniqueRepos = allRepos.filter((repo, index, self) => 
        index === self.findIndex(r => r.id === repo.id)
      );

      const webFrameworks = uniqueRepos
        .filter(isWebFramework)
        .filter(repo => repo.stargazers_count >= 100) // Minimum threshold
        .slice(0, 50); // Limit to top 50 for performance

      setLoadingMessage('Calculating Fuzzy MADM scores...');
      setProgress(85);

      // Transform to framework data
      const frameworkData = webFrameworks.map(transformToFrameworkData);

      // Calculate Fuzzy MADM scores
      const madmResults = calculateFuzzyMADM(frameworkData, defaultWeights);

      setProgress(100);
      setResults(madmResults);
      setState('results');

    } catch (error) {
      console.error('Analysis failed:', error);
      alert(`Analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setState('input');
    }
  }, []);

  const handleApiKeySubmit = useCallback((key: string) => {
    setApiKey(key);
    performAnalysis(key);
  }, [performAnalysis]);

  const handleReanalyze = useCallback(() => {
    if (apiKey) {
      performAnalysis(apiKey);
    }
  }, [apiKey, performAnalysis]);

  switch (state) {
    case 'input':
      return <ApiKeyInput onApiKeySubmit={handleApiKeySubmit} isLoading={false} />;
    
    case 'loading':
      return <LoadingSpinner message={loadingMessage} progress={progress} />;
    
    case 'results':
      return (
        <AnalysisPage 
          results={results} 
          onReanalyze={handleReanalyze}
          isLoading={state === 'loading'}
        />
      );
    
    default:
      return <ApiKeyInput onApiKeySubmit={handleApiKeySubmit} isLoading={false} />;
  }
}

export default App;