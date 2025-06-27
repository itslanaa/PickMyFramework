import React, { useState } from 'react';
import { Key, AlertCircle } from 'lucide-react';

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
  isLoading: boolean;
}

export function ApiKeyInput({ onApiKeySubmit, isLoading }: ApiKeyInputProps) {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySubmit(apiKey.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-indigo-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Key className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Fuzzy MADM Framework Analyzer
          </h1>
          <p className="text-gray-600">
            Enter your GitHub API key to begin analyzing web development frameworks
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
              GitHub API Key
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showKey ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-sm text-amber-800">
                <p className="font-medium mb-1">Why do we need your API key?</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>GitHub API has rate limits (60 requests/hour without auth)</li>
                  <li>With API key: 5,000 requests/hour</li>
                  <li>Your key is only used for this session and never stored</li>
                </ul>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!apiKey.trim() || isLoading}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Initializing...' : 'Start Analysis'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Don't have a GitHub API key?{' '}
            <a
              href="https://github.com/settings/tokens"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-700 underline"
            >
              Create one here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}