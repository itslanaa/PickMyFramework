import React, { useState, useCallback } from 'react';
import { Download, RefreshCw, Settings, TrendingUp, Users, Wrench, Clock } from 'lucide-react';
import { MADMResult } from '../types';
import { Charts } from './Charts';
import { ResultsTable } from './ResultsTable';
import { exportToPDF } from '../utils/pdfExport';

interface AnalysisPageProps {
  results: MADMResult[];
  onReanalyze: () => void;
  isLoading: boolean;
}

export function AnalysisPage({ results, onReanalyze, isLoading }: AnalysisPageProps) {
  const [chartElements, setChartElements] = useState<HTMLElement[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  const handleChartsReady = useCallback((elements: HTMLElement[]) => {
    setChartElements(elements);
  }, []);

  const handleExportPDF = async () => {
    if (chartElements.length === 0) {
      alert('Charts are still loading. Please wait a moment and try again.');
      return;
    }

    setIsExporting(true);
    try {
      await exportToPDF(results, chartElements);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Error exporting PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const topFramework = results[0];
  const totalFrameworks = results.length;
  const avgScore = results.reduce((sum, r) => sum + r.score, 0) / results.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Framework Analysis Results</h1>
              <p className="text-gray-600 mt-1">
                Fuzzy MADM analysis of {totalFrameworks} web development frameworks
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={onReanalyze}
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Re-analyze
              </button>
              <button
                onClick={handleExportPDF}
                disabled={isExporting || chartElements.length === 0}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
              >
                <Download className={`w-4 h-4 mr-2 ${isExporting ? 'animate-pulse' : ''}`} />
                {isExporting ? 'Exporting...' : 'Export PDF'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 rounded-lg p-3">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Top Framework</p>
                <p className="text-lg font-semibold text-gray-900">{topFramework?.framework.name}</p>
                <p className="text-sm text-gray-500">Score: {topFramework?.score.toFixed(3)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-lg p-3">
                <Settings className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Frameworks</p>
                <p className="text-lg font-semibold text-gray-900">{totalFrameworks}</p>
                <p className="text-sm text-gray-500">Analyzed</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-lg p-3">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-lg font-semibold text-gray-900">{avgScore.toFixed(3)}</p>
                <p className="text-sm text-gray-500">MADM Score</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-lg p-3">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Analysis Date</p>
                <p className="text-lg font-semibold text-gray-900">{new Date().toLocaleDateString()}</p>
                <p className="text-sm text-gray-500">Generated</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border-l-4 border-indigo-500 pl-4">
              <h4 className="font-medium text-gray-900">Most Popular</h4>
              <p className="text-sm text-gray-600 mt-1">
                {results.find(r => r.framework.stars === Math.max(...results.map(r => r.framework.stars)))?.framework.name} 
                leads in GitHub stars with {Math.max(...results.map(r => r.framework.stars)).toLocaleString()} stars
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-medium text-gray-900">Most Active</h4>
              <p className="text-sm text-gray-600 mt-1">
                {results.find(r => r.framework.maintenance === Math.max(...results.map(r => r.framework.maintenance)))?.framework.name} 
                shows the highest maintenance activity
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-medium text-gray-900">Best Overall</h4>
              <p className="text-sm text-gray-600 mt-1">
                {topFramework?.framework.name} achieves the highest Fuzzy MADM score, 
                balancing all evaluation criteria effectively
              </p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Visual Analysis</h2>
          <Charts results={results} onChartsReady={handleChartsReady} />
        </div>

        {/* Results Table */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Rankings</h2>
          <ResultsTable results={results} />
        </div>
      </div>
    </div>
  );
}