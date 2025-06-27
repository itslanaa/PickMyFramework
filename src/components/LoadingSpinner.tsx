import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  progress?: number;
}

export function LoadingSpinner({ message = 'Loading...', progress }: LoadingSpinnerProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <div className="mb-6">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Frameworks</h2>
          <p className="text-gray-600">{message}</p>
        </div>

        {progress !== undefined && (
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        )}

        <div className="text-sm text-gray-500 space-y-1">
          <p>• Fetching repository data from GitHub</p>
          <p>• Filtering web development frameworks</p>
          <p>• Calculating Fuzzy MADM scores</p>
          <p>• Preparing visualizations</p>
        </div>
      </div>
    </div>
  );
}